import React, { useState } from "react";
import { Container, VStack, HStack, Input, Button, Select, Text, IconButton, Box, Textarea, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ text: "", priority: "none" });
  const [editTodo, setEditTodo] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddTodo = () => {
    if (newTodo.text.trim() === "") return;
    setTodos((prevTodos) => [...prevTodos, { ...newTodo, id: Date.now() }].sort(sortByPriority));
    setNewTodo({ text: "", priority: "none" });
  };

  const handleEditTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    setEditTodo(todo);
    onOpen();
  };

  const handleSaveEdit = () => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === editTodo.id ? editTodo : todo)).sort(sortByPriority));
    setEditTodo(null);
    onClose();
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const sortByPriority = (a, b) => {
    const priorities = { none: 0, low: 1, medium: 2, high: 3 };
    return priorities[b.priority] - priorities[a.priority];
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <HStack width="100%">
          <Input placeholder="New Todo" value={newTodo.text} onChange={(e) => setNewTodo({ ...newTodo, text: e.target.value })} />
          <Select value={newTodo.priority} onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}>
            <option value="none">None</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
          <Button colorScheme="pink" onClick={handleAddTodo}>
            Add
          </Button>
        </HStack>
        {todos.map((todo) => (
          <HStack key={todo.id} width="100%" justifyContent="space-between">
            <Text>
              {todo.text} ({todo.priority})
            </Text>
            <HStack>
              <IconButton colorScheme="pink" aria-label="Edit" icon={<FaEdit />} onClick={() => handleEditTodo(todo.id)} />
              <IconButton colorScheme="pink" aria-label="Delete" icon={<FaTrash />} onClick={() => handleDeleteTodo(todo.id)} />
            </HStack>
          </HStack>
        ))}
        <Button colorScheme="pink" onClick={onOpen} leftIcon={<FaEye />}>
          View JSON
        </Button>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editTodo ? "Edit Todo" : "Todos JSON"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {editTodo ? (
              <VStack spacing={4}>
                <Input value={editTodo.text} onChange={(e) => setEditTodo({ ...editTodo, text: e.target.value })} />
                <Select value={editTodo.priority} onChange={(e) => setEditTodo({ ...editTodo, priority: e.target.value })}>
                  <option value="none">None</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Select>
              </VStack>
            ) : (
              <Textarea value={JSON.stringify(todos, null, 2)} isReadOnly height="300px" />
            )}
          </ModalBody>
          <ModalFooter>
            {editTodo ? (
              <Button colorScheme="pink" mr={3} onClick={handleSaveEdit}>
                Save
              </Button>
            ) : (
              <Button colorScheme="pink" mr={3} onClick={onClose}>
                Close
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Index;
