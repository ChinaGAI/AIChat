declare namespace API {
  type AssistantTag = {
    id: string;
    name: string;
    icon: string;
  };

  type Chat = {
    id: string;
    created_at: number;
    updated_at: number;
    user_id: number;
    icon: string;
    chat_id: string;
    model_id: string;
    title: string;
    role: ChatAssistant;
    use_context?: string;
  };

  type ChatAssistant = {
    id: string;
    name: string;
    context: string;
    desc: string;
    icon: string;
    enabled: number;
    sort_num: number;
    created_at: string;
    updated_at: string;
    tag_id: string;
    hello_msg: string;
    suggestions: string;
    user_id: number;
    is_like: boolean;
  };

  type ChatMessage = {
    id: string;
    created_at: number;
    type: 'prompt' | 'reply';
    tokens: number;
    content: string;
    replying?: boolean;
  };

  type ChatModel = {
    id: string;
    key_id: string;
    name: string;
    value: string;
    sort_num: number;
    enabled: number;
    magnification: string;
    created_at: string;
    vision: number;
  };

  type Config = {
    password_login_enable: boolean;
    wechat_login_enable: boolean;
    sms_login_enable: boolean;
    mail_enable: boolean;
    captcha_enable: boolean;
    captcha_type: string;
    captcha_config_id: string;
    image_url: string;
    pay_config: {
      type: 'Person' | 'Enterprise';
      alipay_enable: boolean;
      alipay_qrcode: string;
      wechat_enable: boolean;
      wechat_qrcode: string;
      qq_customer: string;
      wechat_customer: string;
    };
  };

  type getBillOrderParams = {
    page?: number;
    page_size?: number;
  };

  type getBillTokenParams = {
    page?: number;
    page_size?: number;
    desc?: string;
  };

  type getChatDetailParams = {
    chat_id?: string;
  };

  type getChatHistoryParams = {
    chat_id?: string;
  };

  type getChatListParams = {
    page: number;
    page_size: number;
  };

  type getRoleListParams = {
    page?: number;
    page_size?: number;
    tag_id?: string;
    search?: string;
  };

  type getRoleParams = {
    id?: string;
  };

  type getShopAlipayParams = {
    shop_id?: string;
  };

  type getUserMyRoleParams = {
    page?: number;
    page_size?: number;
  };

  type getUserRoleLikeParams = {
    page?: number;
    page_size?: number;
  };

  type ModelPlatform = {
    name: string;
    icon: string;
    sort_num: number;
    id: string;
    chat_models: ChatModel[];
  };

  type UserProfile = {
    id: string;
    phone: any;
    created_at: string;
    updated_at: string;
    role_id: number;
    class: number;
    nickname: any;
    avatar: string;
    login_count: number;
    last_ip: string;
    comment_count: number;
    first_ip: string;
    username: string;
    email: string;
    state: string;
    tokens: number;
    all_tokens: number;
  };
}
