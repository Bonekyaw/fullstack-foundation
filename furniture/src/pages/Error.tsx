import { Link } from "react-router-dom";

import Header from "@/components/layouts/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  //CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Error() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="mx-auto flex flex-1 items-center">
        <Card className="w-[350px] md:w-[500px] lg:w-[500px]">
          <CardHeader>
            <CardTitle className="text-center">Oops!</CardTitle>
            <CardDescription className="text-center">
              An error occurs accidently.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button variant="outline" asChild>
              <Link to="/">Go to Home Page</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}

export default Error;
