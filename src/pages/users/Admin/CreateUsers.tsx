import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SvgIcon } from "../../../components/SvgIcon/Index";
import { Button } from "../../../components/Ui/Button/Index";
import { TextInput } from "../../../components/FormInputs/TextInput/Index";
import { SelectInput } from "../../../components/FormInputs/SelectInput/Index";
import { OptionInterface } from "../../../components/FormInputs/SelectInput/Index";
// Note: You would need to install the xlsx library: npm install xlsx
// import * as XLSX from 'xlsx';

interface ParsedUser {
  fullName: string;
  email: string;
  role: string;
  phone?: string;
  status: string;
}

function CreateUsers() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadMode, setUploadMode] = useState<'single' | 'bulk'>('single');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parsedUsers, setParsedUsers] = useState<ParsedUser[]>([]);
  const [uploadError, setUploadError] = useState<string>('');
  const [previewData, setPreviewData] = useState<ParsedUser[]>([]);
  const [uploading, setUploading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      role: null,
      status: null,
    },
  });

  // Role options for select field
  const roleOptions: OptionInterface[] = [
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" },
    { label: "Supervisor", value: "supervisor" },
  ];

  // Status options for select field
  const statusOptions: OptionInterface[] = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError('');
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if file is Excel
    const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Please upload a valid Excel file (.xlsx or .xls)');
      return;
    }
    
    setSelectedFile(file);
    parseExcelFile(file);
  };

  const parseExcelFile = async (file: File) => {
    setUploading(true);
    try {
      // In a production app, you'd use a library like xlsx
      // For now, we'll simulate parsing
      console.log('Parsing file:', file.name);
      
      // Mock parsed data
      const mockParsed: ParsedUser[] = [
        { fullName: 'John Excel', email: 'john.excel@example.com', role: 'user', status: 'active', phone: '555-1234' },
        { fullName: 'Jane Excel', email: 'jane.excel@example.com', role: 'admin', status: 'active', phone: '555-5678' },
        { fullName: 'Bob Excel', email: 'bob.excel@example.com', role: 'user', status: 'inactive' },
      ];
      
      setTimeout(() => {
        setPreviewData(mockParsed);
        setParsedUsers(mockParsed);
        setUploading(false);
      }, 1000); // Simulate parsing delay
      
      /* Real implementation would be:
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(worksheet);
        
        // Map to our format
        const users: ParsedUser[] = parsedData.map((row: any) => ({
          fullName: row.fullName || row.name || '',
          email: row.email || '',
          role: row.role || 'user',
          phone: row.phone || '',
          status: row.status || 'active',
        }));
        
        setPreviewData(users);
        setParsedUsers(users);
        setUploading(false);
      };
      reader.readAsArrayBuffer(file);
      */
    } catch (error) {
      console.error('Error parsing Excel file:', error);
      setUploadError('Failed to parse the Excel file. Please check the format.');
      setUploading(false);
    }
  };

  const handleBulkUpload = () => {
    setUploading(true);
    // In a real app, you'd send the parsed users to your API
    console.log('Uploading users:', parsedUsers);
    
    // Simulate API call
    setTimeout(() => {
      setUploading(false);
      navigate('/admin/users');
    }, 1500);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const switchMode = (mode: 'single' | 'bulk') => {
    setUploadMode(mode);
    // Reset related state
    setSelectedFile(null);
    setPreviewData([]);
    setParsedUsers([]);
    setUploadError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onSubmit = (data) => {
    setLoading(true);
    // In a real app, you'd send this data to your API
    console.log("Form data:", data);

    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
      // Navigate back to users list after successful creation
      navigate("/admin/users");
    }, 1000);
  };

  return (
    <div className="container pt-10">
      {/* Header with back button */}
      <div className="mb-6 flex items-center">
        <Button
          text={
            <>
              <SvgIcon name="arrow-left" className="fill-current w-4 h-4" />
              <span className="ml-2">Back</span>
            </>
          }
          className="bg-gray-200 text-gray-800 hover:bg-gray-300 mr-4"
          onClick={handleGoBack}
        />
        <h1 className="text-2xl font-bold">Add New User</h1>
      </div>

      {/* Mode Switching */}
      <div className="mb-6 flex items-center gap-3 bg-white p-3 rounded-md shadow-sm">
        <div className="font-medium">Choose method:</div>
        <Button
          text="Single User"
          className={`${uploadMode === 'single' ? 'bg-blue-400 text-white' : 'bg-gray-200'}`}
          onClick={() => switchMode('single')}
        />
        <Button
          text="Bulk Upload (Excel)"
          className={`${uploadMode === 'bulk' ? 'bg-blue-400 text-white' : 'bg-gray-200'}`}
          onClick={() => switchMode('bulk')}
        />
      </div>

      {uploadMode === 'single' ? (
        <div className="bg-white rounded-md shadow-sm overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">User Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <TextInput
                  control={control}
                  name="fullName"
                  label="Full Name"
                  errors={errors}
                  rules={{
                    required: "Full name is required",
                  }}
                />
              </div>

              {/* Email */}
              <div>
                <TextInput
                  control={control}
                  name="email"
                  label="Email Address"
                  errors={errors}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                />
              </div>

              {/* Password */}
              <div>
                <TextInput
                  control={control}
                  name="password"
                  type="password"
                  label="Password"
                  errors={errors}
                  showEye
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  }}
                />
              </div>

              {/* Confirm Password */}
              <div>
                <TextInput
                  control={control}
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  errors={errors}
                  showEye
                  rules={{
                    required: "Please confirm your password",
                    // Would typically add validation to match password field
                  }}
                />
              </div>

              {/* Phone */}
              <div>
                <TextInput
                  control={control}
                  name="phone"
                  label="Phone Number"
                  errors={errors}
                />
              </div>

              {/* Role */}
              <div>
                <SelectInput
                  control={control}
                  name="role"
                  label="Role"
                  options={roleOptions}
                  errors={errors}
                  rules={{
                    required: "Role is required",
                  }}
                  isSearchable
                />
              </div>

              {/* Status */}
              <div>
                <SelectInput
                  control={control}
                  name="status"
                  label="Status"
                  options={statusOptions}
                  errors={errors}
                  rules={{
                    required: "Status is required",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="p-6 border-t flex justify-end gap-3">
            <Button
              text="Cancel"
              className="bg-gray-200 hover:bg-gray-300"
              type="button"
              onClick={handleGoBack}
            />
            <Button
              text="Add User"
              className="bg-blue-400 text-white"
              type="submit"
              loading={loading}
            />
          </div>
        </form>
      </div>
      ) : (
        <div className="bg-white rounded-md shadow-sm overflow-hidden p-6">
          <h3 className="text-xl font-semibold mb-4">Bulk Upload Users</h3>
          
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
          />
          
          <div className="flex flex-col gap-4">
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={triggerFileInput}>
              <SvgIcon name="upload" className="w-10 h-10 mx-auto mb-2 text-gray-400" />
              <p className="text-gray-600 mb-1">Click to upload an Excel file</p>
              <p className="text-gray-500 text-sm">Supports .xlsx and .xls formats</p>
            </div>
            
            {selectedFile && (
              <div className="flex items-center gap-2 bg-blue-50 p-2 rounded">
                <SvgIcon name="file-text" className="w-5 h-5 text-blue-500" />
                <span>{selectedFile.name}</span>
                <Button
                  text="×"
                  className="ml-auto bg-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-200 h-6 w-6 min-w-0 p-0 rounded-full"
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewData([]);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                />
              </div>
            )}
            
            {uploadError && (
              <div className="text-red-500 bg-red-50 p-2 rounded">
                {uploadError}
              </div>
            )}
            
            {previewData.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Preview ({previewData.length} users)</h4>
                <div className="border rounded overflow-auto max-h-64">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {previewData.map((user, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{user.fullName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{user.role}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`px-2 py-1 text-xs rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {user.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-6 flex justify-end gap-2">
            <Button
              text="Cancel"
              className="bg-gray-200 hover:bg-gray-300"
              type="button"
              onClick={handleGoBack}
            />
            <Button
              text={`Upload ${parsedUsers.length} Users`}
              className="bg-blue-400 text-white"
              loading={uploading}
              onClick={handleBulkUpload}
              disabled={parsedUsers.length === 0}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateUsers;
