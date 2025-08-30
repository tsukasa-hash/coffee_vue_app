import { createApp } from "vue";
import Dialog from "./TwoButtonDialog.vue";
// NOTE:このプログラムはチャットGPTによって作られたので、仕組みはわからない。
function showDialog(options: {
  message: string;
  leftButtonLabel?: string;
  rightButtonLabel?: string;
}): Promise<"left" | "right"> {
  return new Promise((resolve) => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const app = createApp(Dialog, {
      ...options,
      onAction: (action: "left" | "right") => {
        resolve(action);
        app.unmount();
        document.body.removeChild(container);
      },
    });

    app.mount(container);
  });
}
// NOTE:メソッドの順序はこのとおりでなければならない。showDialogが先でなければ処理内容を読み込めない。
export default async function showDialogWithEachMethod(
  message: string,
  handlers: {
    onLeftClick: () => void,
    onRightClick: () => void,
  },
  leftButtonLabel?: string,
  rightButtonLabel?: string,
) {
  const result = await showDialog({ message, leftButtonLabel, rightButtonLabel });
  switch (result) {
    case "left":
      handlers.onLeftClick();
      break;
    case "right":
      handlers.onRightClick();
      break;
    default:
      break;
  }
}
