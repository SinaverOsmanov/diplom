import { Input } from "antd";

export function Search() {
  const handleSearch = (value: string) => {
    console.log(value);
  };

  return (
    <Input.Search
      placeholder="input search text"
      onSearch={handleSearch}
      enterButton
    />
  );
}
