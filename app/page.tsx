import PatientForm from "@/components/forms/PatientForm";
import PasskeyModal from "@/components/PasskeyModal";
import { Button } from "@/components/ui/button";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Home = async ({ searchParams }: SearchParamProps) => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  const isAdmin = searchParams.admin === "true";
  return (
    <main>
       
      <div className="flex h-screen max-h-screen">
        {isAdmin && <PasskeyModal />}
        <section className="remove-scrollbar container my-auto">
          <div className="sub-container max-w-[496px]">
            <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="patient"
              className="mb-12 h-10 w-fit"
            />
            
            <PatientForm />
            <div className="text-14-regular mt-20 flex justify-between">
              <p className="justify-items-end text-dark-600 xl:text-left">
                ©️ 2024 CarePlus
              </p>
              <Link href="/?admin=true" className="text-green-500">
                Admin
              </Link>
            </div>
          </div>
        </section>
        <SignedIn>
          <div className="absolute top-4 right-4">
            <UserButton />
          </div>
        </SignedIn>
        <Image
          src="/assets/images/onboarding-img.png"
          width={1000}
          height={1000}
          alt="patient"
          className="side-img max-w-[50%]"
          
        />
      </div>
    </main>
  );
};

export default Home;
