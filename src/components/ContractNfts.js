import { Button, Modal, Skeleton, Table, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { getContractNFTs } from "../utils";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },

  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "External Link",
    dataIndex: "external_url",
    key: "external_url",
    render: (value) => {
      if (value) {
        return (
          <a href={value} target="_blank" rel="noreferrer">
            View
          </a>
        );
      }

      return "--";
    },
  },
];

const ModalContent = ({ tokenAddress }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  //filter(): JS built-in function - create a new array containing elements from original array that meet a specified condition.
  //The callback function for its argument executed for each element > true to keep element in new array and false to exclude it

  //map(): JS built-in function - create a new array by applying transformation to each element of the original array
  //It takes a callback function as argument, and apply transformation logic by iterating over each element in the original array

  useEffect(() => {
    getContractNFTs(tokenAddress)
      .then((resp) => {
        const filteredData = resp.result.filter(
          (item) => item.metadata !== null
        );
        const parsedData = filteredData.map((item) =>
          JSON.parse(item.metadata)
        );
        setData(parsedData);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Skeleton active />;
  }

  return <Table rowKey="name" columns={columns} dataSource={data} />;
};

const ContractNfts = ({ tokenAddress }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Tooltip title="View NFT(s) in its contract">
        <Button
          style={{ border: "none" }}
          size="large"
          shape="circle"
          icon={<InfoCircleOutlined />}
          onClick={() => setModalOpen(true)}
        />
      </Tooltip>
      <Modal
        width={1000}
        title="NFT(s) List"
        destroyOnClose
        open={modalOpen}
        footer={null}
        onCancel={() => setModalOpen(false)}
      >
        <ModalContent tokenAddress={tokenAddress} />
      </Modal>
    </>
  );
};

export default ContractNfts;
