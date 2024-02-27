import { getCurrentUser } from "@/actions/getCurrentUser";
import CreateForm from "@/components/shared/CreateForm";
import { userTypes } from "@/types/userTypes";
const page = async () => {
  const user = await getCurrentUser();
  return <CreateForm user={user as userTypes} />;
};

export default page;
