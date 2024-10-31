// vite.config.ts
import { defineConfig } from "file:///C:/Users/ondre/Dropbox/06_Repos/MI/labnl-fieldkit-app/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/ondre/Dropbox/06_Repos/MI/labnl-fieldkit-app/node_modules/@vitejs/plugin-react/dist/index.mjs";
import basicSsl from "file:///C:/Users/ondre/Dropbox/06_Repos/MI/labnl-fieldkit-app/node_modules/@vitejs/plugin-basic-ssl/dist/index.mjs";

// package.json
var package_default = {
  name: "labnl-fieldkit-app",
  private: true,
  awsConfig: {
    distributionID: "E2NJSSD22ZTXTK",
    bucketName: "field-kit-ui"
  },
  version: "0.0.1",
  type: "module",
  scripts: {
    dev: "vite",
    build: "node buildInit.js && tsc && vite build",
    upload: "node awsUpload.js",
    lint: "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    preview: "vite preview"
  },
  dependencies: {
    "@emotion/react": "^11.13.0",
    "@emotion/styled": "^11.13.0",
    "@fontsource/ibm-plex-mono": "^5.0.13",
    "@fontsource/roboto": "^5.0.13",
    "@material-ui/styles": "^4.11.5",
    "@mui/icons-material": "^5.16.6",
    "@mui/material": "^5.16.6",
    "@reduxjs/toolkit": "^2.2.7",
    apexcharts: "^3.51.0",
    "async-mutex": "^0.5.0",
    lodash: "^4.17.21",
    react: "^18.3.1",
    "react-apexcharts": "^1.4.1",
    "react-dom": "^18.3.1",
    "react-github-btn": "^1.4.0",
    "react-redux": "^9.1.2",
    "redux-logger": "^3.0.6"
  },
  devDependencies: {
    "@types/lodash": "^4.17.7",
    "@types/node": "^22.0.2",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@types/redux-logger": "^3.0.13",
    "@types/web-bluetooth": "^0.0.20",
    "@typescript-eslint/eslint-plugin": "^7.15.0",
    "@typescript-eslint/parser": "^7.15.0",
    "@vitejs/plugin-basic-ssl": "^1.1.0",
    "@vitejs/plugin-react": "^4.3.1",
    eslint: "^8.57.0",
    "eslint-plugin-react-hooks": "^4.6.2",
    "eslint-plugin-react-refresh": "^0.4.7",
    sass: "^1.77.8",
    shelljs: "^0.8.5",
    typescript: "^5.2.2",
    vite: "^5.3.4",
    "web-bluetooth": "^0.1.2"
  }
};

// vite.config.ts
var ASSET_PATH = process.env.ASSET_PATH || "";
console.log(`Base path is ${ASSET_PATH}`);
var transformIndexPlugin = () => {
  return {
    name: "transformIndex",
    transformIndexHtml(html) {
      return html.replace(
        "$$version$$",
        package_default.version
      );
    }
  };
};
var renameIndexPlugin = (newFilename) => {
  if (!newFilename) return;
  return {
    name: "renameIndex",
    enforce: "post",
    generateBundle(options, bundle) {
      const indexHtml = bundle["index.html"];
      indexHtml.fileName = newFilename;
    }
  };
};
var vite_config_default = defineConfig({
  base: ASSET_PATH,
  assetsInclude: ["**/*.glb", "**/*.env", "**/*.hdr"],
  server: {
    https: true,
    port: 8080,
    host: "0.0.0.0"
  },
  plugins: [
    react(),
    basicSsl(),
    transformIndexPlugin(),
    renameIndexPlugin(`index-${package_default.version}.html`)
  ],
  esbuild: {
    //drop: ['console','debugger']
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcb25kcmVcXFxcRHJvcGJveFxcXFwwNl9SZXBvc1xcXFxNSVxcXFxsYWJubC1maWVsZGtpdC1hcHBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXG9uZHJlXFxcXERyb3Bib3hcXFxcMDZfUmVwb3NcXFxcTUlcXFxcbGFibmwtZmllbGRraXQtYXBwXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9vbmRyZS9Ecm9wYm94LzA2X1JlcG9zL01JL2xhYm5sLWZpZWxka2l0LWFwcC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgYmFzaWNTc2wgZnJvbSAnQHZpdGVqcy9wbHVnaW4tYmFzaWMtc3NsJ1xuY29uc3QgQVNTRVRfUEFUSCA9IHByb2Nlc3MuZW52LkFTU0VUX1BBVEggfHwgJydcbmltcG9ydCBwYWNrYWdlQ29uZmlnIGZyb20gJy4vcGFja2FnZS5qc29uJyBhc3NlcnQgeyB0eXBlOiAnanNvbicgfVxuXG5jb25zb2xlLmxvZyhgQmFzZSBwYXRoIGlzICR7QVNTRVRfUEFUSH1gKVxuXG5jb25zdCB0cmFuc2Zvcm1JbmRleFBsdWdpbiA9ICgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAndHJhbnNmb3JtSW5kZXgnLFxuICAgIHRyYW5zZm9ybUluZGV4SHRtbChodG1sOiBzdHJpbmcpIHtcbiAgICAgIHJldHVybiBodG1sLnJlcGxhY2UoXG4gICAgICAgICckJHZlcnNpb24kJCcsXG4gICAgICAgIHBhY2thZ2VDb25maWcudmVyc2lvbixcbiAgICAgIClcbiAgICB9LFxuICB9XG59XG5cbmNvbnN0IHJlbmFtZUluZGV4UGx1Z2luID0gKG5ld0ZpbGVuYW1lOnN0cmluZykgPT4ge1xuICBpZiAoIW5ld0ZpbGVuYW1lKSByZXR1cm5cblxuICByZXR1cm4ge1xuICAgIG5hbWU6ICdyZW5hbWVJbmRleCcsXG4gICAgZW5mb3JjZTogJ3Bvc3QnIGFzICdwb3N0JyB8ICdwcmUnLFxuICAgIGdlbmVyYXRlQnVuZGxlKG9wdGlvbnMsIGJ1bmRsZSkge1xuICAgICAgY29uc3QgaW5kZXhIdG1sID0gYnVuZGxlWydpbmRleC5odG1sJ11cbiAgICAgIGluZGV4SHRtbC5maWxlTmFtZSA9IG5ld0ZpbGVuYW1lXG4gICAgfSxcbiAgfVxufVxuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYmFzZTogQVNTRVRfUEFUSCxcbiAgYXNzZXRzSW5jbHVkZTogWycqKi8qLmdsYicsJyoqLyouZW52JywnKiovKi5oZHInXSxcbiAgc2VydmVyOiB7IFxuICAgIGh0dHBzOiB0cnVlLCBcbiAgICBwb3J0OjgwODAgLCBcbiAgICBob3N0OiAnMC4wLjAuMCdcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgYmFzaWNTc2woKSxcbiAgICB0cmFuc2Zvcm1JbmRleFBsdWdpbigpLFxuICAgIHJlbmFtZUluZGV4UGx1Z2luKGBpbmRleC0ke3BhY2thZ2VDb25maWcudmVyc2lvbn0uaHRtbGApXG4gIF0sXG4gIGVzYnVpbGQ6IHtcbiAgICAvL2Ryb3A6IFsnY29uc29sZScsJ2RlYnVnZ2VyJ11cbiAgfVxufSlcbiIsICJ7XG4gIFwibmFtZVwiOiBcImxhYm5sLWZpZWxka2l0LWFwcFwiLFxuICBcInByaXZhdGVcIjogdHJ1ZSxcbiAgXCJhd3NDb25maWdcIjoge1xuICAgIFwiZGlzdHJpYnV0aW9uSURcIjogXCJFMk5KU1NEMjJaVFhUS1wiLFxuICAgIFwiYnVja2V0TmFtZVwiOiBcImZpZWxkLWtpdC11aVwiXG4gIH0sXG4gIFwidmVyc2lvblwiOiBcIjAuMC4xXCIsXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiZGV2XCI6IFwidml0ZVwiLFxuICAgIFwiYnVpbGRcIjogXCJub2RlIGJ1aWxkSW5pdC5qcyAmJiB0c2MgJiYgdml0ZSBidWlsZFwiLFxuICAgIFwidXBsb2FkXCI6IFwibm9kZSBhd3NVcGxvYWQuanNcIixcbiAgICBcImxpbnRcIjogXCJlc2xpbnQgLiAtLWV4dCB0cyx0c3ggLS1yZXBvcnQtdW51c2VkLWRpc2FibGUtZGlyZWN0aXZlcyAtLW1heC13YXJuaW5ncyAwXCIsXG4gICAgXCJwcmV2aWV3XCI6IFwidml0ZSBwcmV2aWV3XCJcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGVtb3Rpb24vcmVhY3RcIjogXCJeMTEuMTMuMFwiLFxuICAgIFwiQGVtb3Rpb24vc3R5bGVkXCI6IFwiXjExLjEzLjBcIixcbiAgICBcIkBmb250c291cmNlL2libS1wbGV4LW1vbm9cIjogXCJeNS4wLjEzXCIsXG4gICAgXCJAZm9udHNvdXJjZS9yb2JvdG9cIjogXCJeNS4wLjEzXCIsXG4gICAgXCJAbWF0ZXJpYWwtdWkvc3R5bGVzXCI6IFwiXjQuMTEuNVwiLFxuICAgIFwiQG11aS9pY29ucy1tYXRlcmlhbFwiOiBcIl41LjE2LjZcIixcbiAgICBcIkBtdWkvbWF0ZXJpYWxcIjogXCJeNS4xNi42XCIsXG4gICAgXCJAcmVkdXhqcy90b29sa2l0XCI6IFwiXjIuMi43XCIsXG4gICAgXCJhcGV4Y2hhcnRzXCI6IFwiXjMuNTEuMFwiLFxuICAgIFwiYXN5bmMtbXV0ZXhcIjogXCJeMC41LjBcIixcbiAgICBcImxvZGFzaFwiOiBcIl40LjE3LjIxXCIsXG4gICAgXCJyZWFjdFwiOiBcIl4xOC4zLjFcIixcbiAgICBcInJlYWN0LWFwZXhjaGFydHNcIjogXCJeMS40LjFcIixcbiAgICBcInJlYWN0LWRvbVwiOiBcIl4xOC4zLjFcIixcbiAgICBcInJlYWN0LWdpdGh1Yi1idG5cIjogXCJeMS40LjBcIixcbiAgICBcInJlYWN0LXJlZHV4XCI6IFwiXjkuMS4yXCIsXG4gICAgXCJyZWR1eC1sb2dnZXJcIjogXCJeMy4wLjZcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAdHlwZXMvbG9kYXNoXCI6IFwiXjQuMTcuN1wiLFxuICAgIFwiQHR5cGVzL25vZGVcIjogXCJeMjIuMC4yXCIsXG4gICAgXCJAdHlwZXMvcmVhY3RcIjogXCJeMTguMy4zXCIsXG4gICAgXCJAdHlwZXMvcmVhY3QtZG9tXCI6IFwiXjE4LjMuMFwiLFxuICAgIFwiQHR5cGVzL3JlZHV4LWxvZ2dlclwiOiBcIl4zLjAuMTNcIixcbiAgICBcIkB0eXBlcy93ZWItYmx1ZXRvb3RoXCI6IFwiXjAuMC4yMFwiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCJeNy4xNS4wXCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI6IFwiXjcuMTUuMFwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tYmFzaWMtc3NsXCI6IFwiXjEuMS4wXCIsXG4gICAgXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiOiBcIl40LjMuMVwiLFxuICAgIFwiZXNsaW50XCI6IFwiXjguNTcuMFwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1yZWFjdC1ob29rc1wiOiBcIl40LjYuMlwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1yZWFjdC1yZWZyZXNoXCI6IFwiXjAuNC43XCIsXG4gICAgXCJzYXNzXCI6IFwiXjEuNzcuOFwiLFxuICAgIFwic2hlbGxqc1wiOiBcIl4wLjguNVwiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjIuMlwiLFxuICAgIFwidml0ZVwiOiBcIl41LjMuNFwiLFxuICAgIFwid2ViLWJs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
