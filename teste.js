const fs = require('fs');
const readlineSync = require('readline-sync');

function main() {
  let exit = false;
  
  while (!exit) {
    console.clear();
    console.log('=== Menu de Exercícios ===');
    console.log('1. Calcular soma do algoritmo');
    console.log('2. Verificar se um número pertence à sequência de Fibonacci');
    console.log('3. Análise de faturamento diário');
    console.log('4. Percentual de representação por estado');
    console.log('5. Inverter caracteres de uma string');
    console.log('6. Sair');
    
    const option = readlineSync.question('\nEscolha uma opção: ');
    
    switch (option) {
      case '1':
        calculateSum();
        break;
      case '2':
        fibonacciCheck();
        break;
      case '3':
        analyzeDailySales();
        break;
      case '4':
        calculateStatePercentages();
        break;
      case '5':
        reverseString();
        break;
      case '6':
        exit = true;
        break;
      default:
        console.log('Opção inválida. Pressione ENTER para continuar...');
        readlineSync.question('');
        break;
    }
  }
}

function calculateSum() {
  console.clear();
  console.log('=== Cálculo da Soma ===');
  
  const INDICE = 13;
  let SOMA = 0;
  let K = 0;
  
  while (K < INDICE) {
    K = K + 1;
    SOMA = SOMA + K;
  }
  
  console.log(`O valor da variável SOMA é: ${SOMA}`);
  console.log('\nExplicação do algoritmo:');
  console.log('Este algoritmo soma todos os números inteiros de 1 até 13.');
  console.log('É equivalente a: 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 + 11 + 12 + 13 = 91');
  
  readlineSync.question('\nPressione ENTER para voltar ao menu...');
}

function fibonacciCheck() {
  console.clear();
  console.log('=== Verificador de Fibonacci ===');
  
  const input = readlineSync.question('Informe um número: ');
  const number = parseInt(input);
  
  if (isNaN(number) || number < 0) {
    console.log('Por favor, informe um número inteiro não negativo.');
    readlineSync.question('\nPressione ENTER para voltar ao menu...');
    return;
  }
  
  // Caso especial para 0 e 1
  if (number === 0 || number === 1) {
    console.log(`O número ${number} pertence à sequência de Fibonacci.`);
    readlineSync.question('\nPressione ENTER para voltar ao menu...');
    return;
  }
  
  let a = 0;
  let b = 1;
  let c = a + b;
  
  while (c <= number) {
    if (c === number) {
      console.log(`O número ${number} pertence à sequência de Fibonacci.`);
      readlineSync.question('\nPressione ENTER para voltar ao menu...');
      return;
    }
    a = b;
    b = c;
    c = a + b;
  }
  
  console.log(`O número ${number} NÃO pertence à sequência de Fibonacci.`);
  readlineSync.question('\nPressione ENTER para voltar ao menu...');
}

function analyzeDailySales() {
  console.clear();
  console.log('=== Análise de Faturamento Diário ===');
  
  try {
    const jsonData = fs.readFileSync('faturamento.json', 'utf8');
    const dailySales = JSON.parse(jsonData);
    
    if (!dailySales || dailySales.length === 0) {
      console.log('Não há dados de faturamento para analisar.');
      readlineSync.question('\nPressione ENTER para voltar ao menu...');
      return;
    }
    
    const salesWithValue = dailySales.filter(sale => sale.valor > 0);
    
    if (salesWithValue.length === 0) {
      console.log('Não há dias com faturamento para analisar.');
      readlineSync.question('\nPressione ENTER para voltar ao menu...');
      return;
    }
    
    const minValue = Math.min(...salesWithValue.map(sale => sale.valor));
    
    const maxValue = Math.max(...salesWithValue.map(sale => sale.valor));
    
    const sum = salesWithValue.reduce((acc, sale) => acc + sale.valor, 0);
    const average = sum / salesWithValue.length;
    
    const daysAboveAverage = salesWithValue.filter(sale => sale.valor > average).length;
    
    console.log(`Menor valor de faturamento: R$ ${minValue.toFixed(2)}`);
    console.log(`Maior valor de faturamento: R$ ${maxValue.toFixed(2)}`);
    console.log(`Média mensal de faturamento: R$ ${average.toFixed(2)}`);
    console.log(`Número de dias com faturamento acima da média: ${daysAboveAverage}`);
  } catch (error) {
    console.log(`Erro ao analisar os dados de faturamento: ${error.message}`);
  }
  
  readlineSync.question('\nPressione ENTER para voltar ao menu...');
}

function calculateStatePercentages() {
  console.clear();
  console.log('=== Percentual de Representação por Estado ===');
  
  const stateRevenue = {
    'SP': 67836.43,
    'RJ': 36678.66,
    'MG': 29229.88,
    'ES': 27165.48,
    'Outros': 19849.53
  };
  
  const total = Object.values(stateRevenue).reduce((acc, value) => acc + value, 0);
  
  console.log(`Faturamento total: R$ ${total.toFixed(2)}\n`);
  console.log('Percentual de representação por estado:');
  
  for (const [state, revenue] of Object.entries(stateRevenue)) {
    const percentage = (revenue / total) * 100;
    console.log(`${state}: ${percentage.toFixed(2)}%`);
  }
  
  readlineSync.question('\nPressione ENTER para voltar ao menu...');
}

function reverseString() {
  console.clear();
  console.log('=== Inversor de String ===');
  
  const input = readlineSync.question('Digite uma string para inverter: ');
  
  if (!input) {
    console.log('A string não pode ser vazia.');
    readlineSync.question('\nPressione ENTER para voltar ao menu...');
    return;
  }
  
  const reversed = invertString(input);
  console.log(`\nString original: ${input}`);
  console.log(`String invertida: ${reversed}`);
  
  readlineSync.question('\nPressione ENTER para voltar ao menu...');
}

function invertString(str) {
  let reversed = '';
  
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  
  return reversed;
}

main();
