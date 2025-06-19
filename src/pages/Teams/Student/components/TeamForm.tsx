import React, { useState } from "react";
import { Button } from "../../../../components/Ui/Button/Index";
import { ModalDialog } from "../../../../components/ModalDialog/Index";
import { TextInput } from "../../../../components/FormInputs/TextInput/Index";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import IconAtom from "../../../../components/IconAtom/Icon-Atom";
import { Avatar } from "../../../../components/Ui/Avatar/Index";
import { useUpdateEffect } from "react-use";

interface TeamFormProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const schema = yup
  .object({
    teamName: yup.string().required("Team name is required"),
  })
  .required();

// Mock user data
interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "Ahmed",
    email: "ahmed@gmail.com",
    avatar: "/avatars/avatar1.jpg",
  },
  {
    id: 2,
    name: "Mohamed",
    email: "mohamed@gmail.com",
    avatar: "/avatars/avatar2.jpg",
  },
  {
    id: 3,
    name: "Ali",
    email: "ali@gmail.com",
    avatar: "/avatars/avatar3.jpg",
  },
  {
    id: 4,
    name: "Nada",
    email: "nada@gmail.com",
    avatar: "/avatars/avatar4.jpg",
  },
];

const TeamForm: React.FC<TeamFormProps> = ({ state, setState }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [invitedUsers, setInvitedUsers] = useState<number[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
    } else {
      const filteredResults = mockUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  };

  const handleSendInvite = (userId: number) => {
    if (!invitedUsers.includes(userId)) {
      setInvitedUsers([...invitedUsers, userId]);
    }
  };

  const onSubmit = (data: any) => {
    console.log(data);
    console.log("Invited users:", invitedUsers);
    // Process team creation data
    setState(false);
  };
  useUpdateEffect(() => {
    if (!state) {
      reset();
      setSearchQuery("");
      setSearchResults([]);
      setInvitedUsers([]);
    }
  }, [state]);
  return (
    <ModalDialog
      isOpen={state}
      onClose={() => setState(false)}
      title="create team"
      size="md"
      contentClassName="p-6"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        <div className="flex flex-col w-full justify-stretch items-start gap-4 mb-8">
          <TextInput
            className="w-full"
            label="Team name"
            name="teamName"
            control={control}
            errors={errors}
          />

          <div className="w-full">
            <div className="font-medium mb-1">Team members</div>
            <div className="text-sm text-gray-600 mb-3">
              Who should be in this team?
            </div>
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search members..."
                className="w-full py-2 px-3 border rounded-md pr-10"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <IconAtom name="Search" className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            {searchResults.length > 0 && (
              <div className="mt-4 bg-gray-100 rounded-md p-4 max-h-80 overflow-y-auto">
                {searchResults.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full bg-gray-200">
                        <Avatar
                          size="sm"
                          className="w-full h-full object-cover"
                          text={user.name.charAt(0)}
                        />
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleSendInvite(user.id)}
                      text={
                        invitedUsers.includes(user.id)
                          ? "Invited"
                          : "Send Invite"
                      }
                      className={`px-3 py-1 text-sm rounded ${
                        invitedUsers.includes(user.id)
                          ? "bg-gray-300"
                          : "bg-blue-500"
                      }`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button
            onClick={() => setState(false)}
            text="Cancel"
            className="px-4 py-2 bg-white text-blue-400 rounded border-[1px] border-blue-400"
          />
          <Button
            type="submit"
            text="Create"
            className="px-4 py-2 text-white rounded"
          />
        </div>
      </form>
    </ModalDialog>
  );
};

export default TeamForm;
