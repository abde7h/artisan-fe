import { redirect } from "next/navigation";

//import { getCurrentUser } from "@/lib/session";
import Form from "../components/Modal";
//import ProjectForm from "@/components/ProjectForm";

const CreateProduct = async () => {
  const session = await getCurrentUser();

  if (!session?.user) redirect("/")

  return (
    <Modal>
      <h3 className="modal-head-text">Create a New Project</h3>

      <ProjectForm type="create" session={session} />
    </Modal>
  );
};

export default CreateProduct;