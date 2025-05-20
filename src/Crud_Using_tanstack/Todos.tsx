import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const BASE_URL = 'http://192.168.192.188:5000/api/todos';

export default function Todos() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [editingTodoId, setEditingTodoId] = useState<string | number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  // READ
  const { data = [], isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await axios.get(BASE_URL);
      return res.data;
    },
  });

  // CREATE
  const createTodo = useMutation({
    mutationFn: async (newTitle: string) => {
      await axios.post(BASE_URL, { title: newTitle });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setTitle('');
    },
  });

  // DELETE
  const deleteTodo = useMutation({
    mutationFn: async (id: string | number) => {
      await axios.delete(`${BASE_URL}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  // UPDATE
  const updateTodo = useMutation({
    mutationFn: async (todo: { id: string | number; title: string }) => {
      await axios.put(`${BASE_URL}/${todo.id}`, { title: todo.title });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setEditingTodoId(null);
      setEditingTitle('');
    },
  });

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="New Todo"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button title="Add Todo" onPress={() => createTodo.mutate(title)} />

      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={Array.isArray(data) ? data : []}
          keyExtractor={(item, index) => (item?.id || item?._id || index).toString()}
          renderItem={({ item }) => {
            const todoId = item?.id || item?._id;
            const isEditing = editingTodoId === todoId;

            return (
              <View style={{ marginVertical: 10 }}>
                {isEditing ? (
                  <>
                    <TextInput
                      value={editingTitle}
                      onChangeText={setEditingTitle}
                      style={{ borderWidth: 1, marginBottom: 5, padding: 5 }}
                    />
                    <Button
                      title="Save"
                      onPress={() =>
                        updateTodo.mutate({ id: todoId, title: editingTitle })
                      }
                    />
                    <Button title="Cancel" onPress={() => setEditingTodoId(null)} />
                  </>
                ) : (
                  <>
                    <Text>{item.title}</Text>
                    <Button title="Delete" onPress={() => deleteTodo.mutate(todoId)} />
                    <Button
                      title="Edit"
                      onPress={() => {
                        setEditingTodoId(todoId);
                        setEditingTitle(item.title);
                      }}
                    />
                  </>
                )}
              </View>
            );
          }}
        />
      )}
    </View>
  );
}
