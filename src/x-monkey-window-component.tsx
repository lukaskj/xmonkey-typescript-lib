import { ComponentChildren } from "preact";
import { useSessionStorage } from "./hooks";
import { useMemo } from "preact/hooks";
import { getStorageKeyIdFromString } from "./utils/get-storage-key-id-from-string";

type VProps = {
  title: string;
  children?: ComponentChildren;
};

export function XMonkeyWindowComponent(props: VProps) {
  const storageKey = useMemo(() => getStorageKeyIdFromString(props.title), [props.title]);
  const [minimized, setMinimized] = useSessionStorage(storageKey, false);

  function toggleMinimize() {
    setMinimized(!minimized);
  }

  return (
    <div className={`xmwr_c d-f fd-c ai-c jc-sb` + (minimized ? " minim" : "")}>
      <div className="xmwr-h w-100 m0 d-f fd-r jc-c bg-primary noselect">
        <div className="xmwr-title m0">{props.title}</div>
        <MinimizeButton toggleMinimize={toggleMinimize} minimized={minimized} />
      </div>
      <div className="xmwr-b w-100 d-f jc-c">{props.children}</div>
    </div>
  );
}

function MinimizeButton({ minimized, toggleMinimize }: { minimized: boolean; toggleMinimize: CallableFunction }) {
  const minimizeChar = minimized ? "+" : "-";

  return (
    <div className="xmwr-x m0" onClick={() => toggleMinimize()}>
      {minimizeChar}
    </div>
  );
}
