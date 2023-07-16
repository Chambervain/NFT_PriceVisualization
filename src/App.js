import "./App.css";
import { Layout, Input, Button, message, List } from "antd";
import { searchNFTs } from "./utils";
import { useState } from "react";
import NftCard from "./components/NftCard";

// JSON.stringify() -> flatten the JS object to json string
// JSON.parse() -> deserialize json string to JS object

//React function component - Hooks
//const [state, setState function] = useState(default value)

// const { Header, Content } = Layout;

// function App() {
//   const [loading, setLoading] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const [nfts, setNfts] = useState([]);

//   const handleSearch = async () => {
//     setLoading(true);

//     try {
//       const data = await searchNFTs(searchText);
//       setNfts(data.result);
//     } catch (error) {
//       message.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Layout style={{ height: "100vh" }}>
//       <Header>
//         <div style={{ fontSize: 16, fontWeight: 600, color: "white" }}>
//           NFT Browser
//         </div>
//       </Header>
//       <Content
//         style={{ height: "calc(100% - 64px)", padding: 20, overflow: "auto" }}
//       >
//         <Input.Group compact style={{ width: 600 }}>
//           <Input
//             style={{
//               width: "calc(100% - 200px)",
//             }}
//             value={searchText}
//             onChange={(e) => {
//               setSearchText(e.target.value);
//             }}
//           />
//           <Button type="primary" onClick={handleSearch} loading={loading}>
//             Submit
//           </Button>
//         </Input.Group>
//         <br />
//         <List
//           grid={{ gutter: 16, column: 4 }}
//           dataSource={nfts}
//           renderItem={(item) => (
//             <List.Item>
//               <Card title={JSON.parse(item.metadata).name}>
//                 <Image src={JSON.parse(item.metadata).image} />
//               </Card>
//             </List.Item>
//           )}
//         />
//       </Content>
//     </Layout>
//   );
// }

// export default App;

//useState: React Hooks -> [state, setState function]

const { Header, Content } = Layout;

function App() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSearch = async () => {
    if (searchText === "") {
      return;
    }

    setLoading(true);

    try {
      const data = await searchNFTs(searchText);
      setNfts(data.result);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={{ backgroundColor: "#3A3B3C" }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: "white" }}>
          NFT Browser
        </div>
      </Header>
      <Content
        style={{ height: "calc(100% - 64px)", padding: 20, overflowY: "auto" }}
      >
        <Input.Group compact>
          <Input
            style={{ width: 300 }}
            placeholder="Enter a NFT name to search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button type="primary" onClick={handleSearch} loading={loading}>
            Search
          </Button>
        </Input.Group>
        <List
          loading={loading}
          style={{
            marginTop: 20,
            height: "calc(100% - 52px)",
            overflow: "auto",
          }}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          dataSource={nfts}
          renderItem={(nft) => <NftCard nft={nft} />}
        />
      </Content>
    </Layout>
  );
}

export default App;
