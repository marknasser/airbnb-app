"use client";
import React, { useEffect, useState } from "react";

interface ClientOnlyProps {
  children: React.ReactNode;
}
const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []); // the moment this comonent loads, means it has finished the server side rendering and it can be mounted

  if (!hasMounted) {
    return null;
  }
  return <>{children}</>;
};

export default ClientOnly;
