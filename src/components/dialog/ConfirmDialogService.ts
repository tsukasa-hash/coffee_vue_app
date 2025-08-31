import { createApp } from "vue";
import Dialog from "./ConfirmDialog.vue";

export interface ConfirmDialogOptions {
  message: string;
  buttonLabel?: string;
}

export default class ConfirmDialogService {
  // confirmダイアログを表示
  static showDialog(options: ConfirmDialogOptions): Promise<"confirm"> {
    return new Promise((resolve) => {
      const container = document.createElement("div");
      document.body.appendChild(container);

      const app = createApp(Dialog, {
        ...options,
        onAction: (action: "confirm") => {
          resolve(action);
          app.unmount();
          document.body.removeChild(container);
        },
      });

      app.mount(container);
    });
  }
}
