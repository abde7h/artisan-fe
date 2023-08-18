import { redirect } from "next/navigation";

//import { getCurrentUser } from "@/lib/session";
import Modal from "../../app/components/Modal";
import { getCurrentUser } from "@/lib/session";
import ProjectForm from "../../app/components/ProjectForm";
//import ProjectForm from "@/components/ProjectForm";

const CreateProduct = async () => {
  const userLogged = await getCurrentUser();

  //if (!session?.user) redirect("/")

  return (
    <Modal>
      <h3 className="md:text-5xl text-3xl font-extrabold text-left max-w-5xl w-full">Create a New Project</h3>

      {/*<ProjectForm type="create" session={session} />*/}
    </Modal>
  );
};

export default CreateProduct;