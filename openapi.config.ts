const { generateService } = require("@umijs/openapi");

/**
 * API 文档
 * https://apifox.com/apidoc/shared-81f1c71b-fc6a-4ccb-a390-cc2f265a7e31
 */
generateService({
  schemaPath:
    "http://127.0.0.1:4523/export/openapi?projectId=4078208&version=3.1",
  serversPath: "./servers",
  requestLibPath: "@/utils/request",
  templatesFolder: "./utils/request/templates",
}).then(() => {
  console.log("generate service success");
});
