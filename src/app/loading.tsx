import Loader from "@/components/ui/Loader";
import Overlay from "@/components/ui/Overlay";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className=" bg-light/40 absolute z-30 t w-screen h-screen top-0  bottom-0 ">
      <Loader />
    </div>
  );
}
