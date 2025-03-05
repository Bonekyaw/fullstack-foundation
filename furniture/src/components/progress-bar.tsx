import { useNavigation } from "react-router";
import { useIsFetching } from "@tanstack/react-query";

export default function ProgressBar() {
  const navigation = useNavigation();
  const fetching = useIsFetching() > 0;

  if (fetching || navigation.state !== "idle") {
    return (
      <div className="fixed left-0 top-0 z-50 h-1 w-full overflow-hidden bg-gray-200">
        <div className="animate-progress absolute h-full w-2/3 bg-green-600" />
      </div>
    );
  }

  return null;
}
