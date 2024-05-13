"use client";
import { Button, Form, Space, Spin, Switch, Toast } from "@douyinfe/semi-ui";
import { FormApi } from "@douyinfe/semi-ui/lib/es/form";
import { useEffect, useRef, useState } from "react";
import { useChatStore } from "@/stores/chat";
import { getRoleTagList, postRole, putRole } from "@/servers/api/role";
import { useRequest } from "ahooks";
import SuggestionInput from "./suggestion-input";
import { useRouter, useSearchParams } from "next/navigation";
import MessagePanel from "../chat/chat-panel/message-panel";
import AssisantPanel from "../chat/chat-panel/assistant-panel";
import ChatForm from "../chat/chat-panel/chat-form";
import ImageUpload from "../base/image-upload";
import copy from "copy-to-clipboard";
import { useGlobalStore } from "@/stores";
import { useModalContext } from "@/context/modal-context";

const BuilderView = () => {
  const assistantId = useSearchParams().get("id");

  const router = useRouter();
  const formRef = useRef<FormApi<any>>();
  const {
    assistant,
    selectAssistant,
    fetchAssistant,
    messages,
    resetMessages,
  } = useChatStore();
  const { isLogin } = useGlobalStore();
  const { openLoginModal } = useModalContext();

  const { data: tags } = useRequest(() => getRoleTagList({ cache: true }));

  const { loading: fetching } = useRequest(async () => {
    if (assistantId) {
      try {
        await fetchAssistant(assistantId);
      } catch {
        router.push("/chat");
        Toast.error("助手不存在");
      }
    } else {
      selectAssistant({
        icon: "/icon.png",
      } as API.ChatAssistant);
    }
  });

  useEffect(() => {
    resetMessages();
    useChatStore.setState((state) => {
      state.isBuilder = true;
    });
    return () => {
      useChatStore.setState((state) => {
        state.isBuilder = false;
      });
    };
  }, []);

  const { run: onUpdate, loading: updateLoading } = useRequest(putRole, {
    manual: true,
    onSuccess: () => {
      selectAssistant({
        ...assistant!,
        isEdit: false,
      });
      Toast.success("保存成功");
    },
    onError: (e: any) => {
      Toast.error(e.message || "请求出错");
    },
  });

  const { run: onSubmit, loading } = useRequest(postRole, {
    manual: true,
    onSuccess: ({ id }) => {
      selectAssistant({
        ...assistant!,
        isEdit: false,
      });
      router.replace(`/apps/builder?id=${id}`);
      Toast.success("创建成功");
    },
    onError: (e: any) => {
      Toast.error(e.message || "请求出错");
    },
  });

  const onValueChange = (values: any) => {
    selectAssistant({ ...values, isEdit: true });
  };

  const onCopySheareLink = () => {
    if (!assistantId) return Toast.error("请先保存");
    copy(`${window.location.origin}/chat?assistant_id=${assistantId}`);
    Toast.success("复制成功");
  };

  return (
    <Spin spinning={fetching}>
      <div className="bg-white rounded-t-3xl">
        <div className="flex items-center justify-between h-14">
          <div className="flex-1 text-text-0 font-bold px-6 hidden sm:block">
            配置
          </div>
          <div className="flex flex-1 gap-2 justify-between pl-6 sm:pl-0">
            <Space className="text-text-1 font-bold">
              公开
              <Switch
                checked={assistant?.enabled === 1}
                onChange={(value) =>
                  selectAssistant({ ...assistant!, enabled: value ? 1 : 0 })
                }
              />
              {assistant?.enabled === 1 && (
                <Button onClick={onCopySheareLink}>复制分享链接</Button>
              )}
            </Space>
            <Button
              theme="solid"
              className="w-20 mr-6"
              loading={loading || updateLoading}
              onClick={() => formRef.current?.submitForm()}
            >
              {assistantId ? "保存" : "创建"}
            </Button>
          </div>
        </div>
        <div className="flex pb-6 h-[calc(100vh-7rem)]">
          <div className="flex-1 px-6 h-full overflow-y-scroll">
            <Form
              allowEmpty
              getFormApi={(ref) => (formRef.current = ref)}
              onValueChange={onValueChange}
              onSubmit={() => {
                if (assistantId) {
                  onUpdate({
                    ...assistant!,
                    id: assistantId,
                  });
                } else {
                  if (!isLogin()) return openLoginModal();
                  onSubmit(assistant!);
                }
              }}
              initValues={assistant}
              key={fetching.toString()}
            >
              <ImageUpload field="icon" noLabel className="text-center block" />
              <Form.Input
                label="名称"
                field="name"
                placeholder="请填写名称"
                size="large"
                rules={[{ required: true, message: "请输入名称" }]}
              />
              <Form.RadioGroup
                label="分类"
                field="tag_id"
                rules={[{ required: true, message: "请选择分类" }]}
              >
                {tags?.map((tag) => (
                  <Form.Radio key={tag.id} value={tag.id}>
                    {tag.name}
                  </Form.Radio>
                ))}
              </Form.RadioGroup>
              <Form.TextArea
                label="描述"
                field="desc"
                className="semi-input-textarea-wrapper-large"
                placeholder="请填写描述信息"
                rules={[{ required: true, message: "请输入描述" }]}
              />
              <Form.TextArea
                label="人设定义"
                field="context"
                rules={[{ required: true, message: "请输入人设定义" }]}
                className="semi-input-textarea-wrapper-large"
                autosize
                placeholder={`这个角色的人设是什么，应该如何怎么做，应该避免什么。

例子: 你是一个前端工程师，我在开发一个网站，我向你寻求代码时，只给我代码，无需其他解释。回答时给我最有效的解决方案，并且带上中文注释`}
              />
              <Form.Input label="对话开场白" field="hello_msg" size="large" />
              <SuggestionInput label="对话建议选项" field="suggestions" />
            </Form>
          </div>
          <div className="flex-1 h-full border bg-gray-100 rounded-lg overflow-hidden sm:block hidden">
            <div className="text-text-3 font-medium text-xs pt-4 px-6">
              预览测试
            </div>
            <div className="h-[calc(100%-2.25rem)]">
              <div className="flex w-full flex-col overflow-hidden h-full flex-1 bg-gray-100">
                {messages?.length ? <MessagePanel /> : <AssisantPanel />}
                <ChatForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default BuilderView;
