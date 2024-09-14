import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Link } from 'react-router-dom';

type Props = {
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  children: React.ReactNode;
};

function CardWrapper({
  headerLabel,
  backButtonHref,
  backButtonLabel,
  children,
}: Props) {
  return (
    <Card className=" w-[400px]">
      <CardHeader>
        <h1 className=" text-3xl font-bold font-mono">Login Form</h1>
        <p className="text-xl">{headerLabel}</p>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <Button asChild variant="link">
          <Link to={backButtonHref}>{backButtonLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CardWrapper;
