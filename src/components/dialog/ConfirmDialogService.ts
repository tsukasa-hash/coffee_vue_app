import { createApp } from "vue";
import Dialog from "./ConfirmDialog.vue";

export default function showDialog(options: {
  message: string;
  buttonLabel?: string;
}): Promise<"confirm"> {
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
