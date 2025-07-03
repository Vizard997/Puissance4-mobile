import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const ROWS = 6;
const COLS = 7;

const App = () => {
  const [board, setBoard] = useState(Array(ROWS).fill(null).map(() => Array(COLS).fill(0)));
  const [currentPlayer, setCurrentPlayer] = useState(1);

  const dropDisc = (col) => {
    const newBoard = [...board.map(row => [...row])];
    for (let row = ROWS - 1; row >= 0; row--) {
      if (newBoard[row][col] === 0) {
        newBoard[row][col] = currentPlayer;
        setBoard(newBoard);
        if (checkWin(newBoard, row, col, currentPlayer)) {
          Alert.alert(`Joueur ${currentPlayer} gagne !`);
          setBoard(Array(ROWS).fill(null).map(() => Array(COLS).fill(0)));
        } else {
          setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        }
        break;
      }
    }
  };

  const checkWin = (board, row, col, player) => {
    const directions = [
      [0, 1], [1, 0], [1, 1], [1, -1]
    ];
    for (let [dx, dy] of directions) {
      let count = 1;
      for (let d = 1; d < 4; d++) {
        const r = row + d * dx;
        const c = col + d * dy;
        if (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) count++;
        else break;
      }
      for (let d = 1; d < 4; d++) {
        const r = row - d * dx;
        const c = col - d * dy;
        if (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) count++;
        else break;
      }
      if (count >= 4) return true;
    }
    return false;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Puissance 4</Text>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <TouchableOpacity
              key={colIndex}
              style={[styles.cell, { backgroundColor: cell === 1 ? 'red' : cell === 2 ? 'yellow' : 'white' }]}
              onPress={() => dropDisc(colIndex)}
            />
          ))}
        </View>
      ))}
      <Text style={styles.turn}>Tour du Joueur {currentPlayer}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#222', paddingTop: 50, alignItems: 'center' },
  title: { fontSize: 30, color: 'white', marginBottom: 20 },
  row: { flexDirection: 'row' },
  cell: { width: 50, height: 50, margin: 2, borderRadius: 25 },
  turn: { fontSize: 18, color: 'white', marginTop: 20 }
});

export default App;
