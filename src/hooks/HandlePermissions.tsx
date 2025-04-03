import { useState } from "react";
import { useEffectOnce } from "react-use";
import { useAuth } from "../store/auth";

interface componentInterfaces {
  object: any;
  permissionName: any;
  permissionIsMulti?: boolean;
}
function HandlePermissions({
  object,
  permissionName,
  permissionIsMulti = false,
}: componentInterfaces) {
  const { permissions } = useAuth();
  const [isReturn, setIsReturn] = useState<boolean>(false);
  useEffectOnce(() => {
    if (permissions?.length) {
      // permissionIsMulti= true
      if (permissionIsMulti) {
        let dataReturn: any[] = [];
        permissionName.forEach((targetName: any) => {
          permissions?.forEach((permission: any) => {
            if (permission?.name == targetName) {
              dataReturn.push(permission);
            }
          });
        });
        if (dataReturn?.length == permissionName.length) {
          setIsReturn(true);
        }
      }
      // permissionIsMulti= false
      else {
        permissions?.forEach((permission: any) => {
          if (permission?.name == permissionName) {
            setIsReturn(true);
          }
        });
      }
    }
  });

  return isReturn ? object : false;
}

export default HandlePermissions;
