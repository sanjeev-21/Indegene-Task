import React, { useState, useContext } from "react";
import {
  Collapse,
  Button,
  Input,
  Modal,
  Form,
  Alert,
  Popconfirm,
  message,
  Tooltip,
} from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { GlobalContext } from "../Context/GlobalState";
//import {v4 as uuid} from 'uuid';

export default function Questions() {
  const { questions, addQuestion, editQuestion, deleteQuestion } =
    useContext(GlobalContext);
  const [flag, setFlag] = useState(false);
  const [id, setId] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState("required");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editedAnswer, setEditAnswer] = useState("");
  const [editedQues, setEditQuestion] = useState("");
  const [quesFlag, setQuesFlag] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [showEoorMsg, setShowErrorMsg] = useState(false);
  const { Panel } = Collapse;
  function editAnswer(value) {
    console.log(value);
    setId(value.id);
    setEditQuestion(value.question);
    setFlag(true);
  }
  function panelClick() {
    setFlag(false);
  }
  function openModal() {
    setQuesFlag(false);
    setIsModalVisible(true);
  }
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  function handleQuestion(e) {
    setShowErrorMsg(false);
    setQuestion(e.target.value);
  }
  function handleAnswer(e) {
    setAnswer(e.target.value);
  }
  function handleEditAnswer(e) {
    setEditAnswer(e.target.value);
  }
  const handleOk = () => {
    if (question !== "") {
      let obj = {
        //"id": uuid(),
        id: question.length + 1,
        question: question,
        answer: answer,
      };
      setQuesFlag(true);
      setTimeout(() => {
        setQuesFlag(false);
      }, 2500);
      console.log("obj", obj);
      addQuestion(obj);
      setIsModalVisible(false);
    } else {
      setShowErrorMsg(true);
    }
  };
  function updateAns() {
    let obj = {
      id: id,
      question: editedQues,
      answer: editedAnswer,
    };
    editQuestion(obj);
    //setFlag(false);
    var x = document.querySelectorAll(".ant-collapse-item-active");
    console.log(x);
    if (x.length) {
      for (var i = 0; i < x.length; i++) {
        setTimeout(function () {
          var el = document.querySelector(".ant-collapse-item-active");
          console.log(el);
          el.children[0].click();
        }, 100);
      }
    }
  }
  function confirm(e) {
    deleteQuestion(deleteId);
    message.success("Deleted Successfully");
  }

  function cancel(e) {
    message.error("Click on No");
  }
  function removeQuestion(value) {
    setDeleteId(value.id);
  }
  return (
    <div>
      {quesFlag && (
        <div>
          <Alert
            style={{ width: "40%", float: "right" }}
            message="Question Added Successfully"
            description="Thank you for adding a question!"
            type="success"
            showIcon
            closable
          />
        </div>
      )}
      <br></br>
      <div style={{ marginTop: "5%" }}>
        <h2>Frequently Asked Questions!</h2>
        <Collapse accordion onChange={() => panelClick()}>
          {questions &&
            questions.map((value, i) => (
              <Panel
                header={
                  <>
                    <span>{value.question}</span>
                    <Popconfirm
                      title="Are you sure to delete this question?"
                      onConfirm={confirm}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Tooltip title="Delete">
                        <DeleteTwoTone
                          onClick={() => removeQuestion(value)}
                          style={{ float: "right" }}
                        />
                      </Tooltip>
                    </Popconfirm>
                  </>
                }
                key={i}
              >
                {!flag && (
                  <>
                    <span>{value.answer}</span>
                    <Tooltip title="Edit">
                      <span
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                        onClick={() => editAnswer(value)}
                      >
                        <EditTwoTone />
                      </span>
                    </Tooltip>
                  </>
                )}
                {flag && (
                  <>
                    <Input
                      style={{ width: "90%" }}
                      defaultValue={value.answer}
                      onChange={(e) => handleEditAnswer(e)}
                    />
                    <Button type="primary" onClick={() => updateAns()}>
                      Update
                    </Button>
                  </>
                )}
              </Panel>
            ))}
        </Collapse>
        <Button
          type="primary"
          onClick={() => openModal()}
          style={{ left: "50%", marginTop: "5%" }}
        >
          Add
        </Button>
        <Modal
          title="Add a New Question"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Create"
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              requiredMarkValue: requiredMark,
            }}
            onValuesChange={onRequiredTypeChange}
            requiredMark={requiredMark}
          >
            <Form.Item label="Question" required>
              <Input
                placeholder="Question"
                onChange={(e) => handleQuestion(e)}
              />
              {showEoorMsg && (
                <span style={{ color: "red" }}>Please enter a Question!</span>
              )}
            </Form.Item>
            <Form.Item label="Answer">
              <Input placeholder="Answer" onChange={(e) => handleAnswer(e)} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
