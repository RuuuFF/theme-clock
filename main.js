const hourEl = document.querySelector('.hour')
const minuteEl = document.querySelector('.minute')
const secondEl = document.querySelector('.second')
const timeEl = document.querySelector('.time')
const dateEl = document.querySelector('.date')
const toggle = document.querySelector('.toggle')

// Array com os dias da semana
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
// Array com os meses do ano
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

// Adiciona um ouvidor de eventos do tipo "click" em "toggle"
toggle.addEventListener('click', event => {
  // Pega o elemento "html" no documento
  const html = document.querySelector('html')
  // Alterna a classe "dark" em hrml (Se tiver, ele tira. Se não tiver, ele coloca)
  html.classList.toggle('dark')
  
  // Se "html" conter a classe "dark"
  if (html.classList.contains('dark')) {
    // Pega o evento, sua origem (o botão) e adiciona o inner HTML
    event.target.innerHTML = 'Light mode'
  } else {
    // Se não conter, ele pega o evento, sua origem (o botão) e e adiciona o innerHTML
    event.target.innerHTML = 'Dark mode'
  }
})


// Função setTime
function setTime() {
  // Cria um objeto com a data/hora atual
  const time = new Date()
  
  // Retorna o mês (de 0 a 11)
  const month = time.getMonth()
  
  // Retorna o dia da semana (de 0 a 6)
  const day = time.getDay()
  
  // Retorna o dia do mês (de 1 a 31)
  const date = time.getDate()
  
  // Retorna a hora de acordo com o horário local ( de 0 a 23)
  const hours = time.getHours()
  // Retorna o restante da visão do valor de "hours" / 12
  const hoursForClock = hours % 12
  // Atribui o valor em "ampm" com uma condicional: se "hours" (de 0 a 23) for maior ou igual a 12 (meio dia), ele retorna 'PM', senão, 'AM'
  const ampm = hours >= 12 ? 'PM' : 'AM'
  
  // Retorna os minutos de acordo com o horário local (de 0 a 59)
  const minutes = time.getMinutes()
  
  // Retorna os segundos de acordo com o horário local (de 0 a 59)
  const seconds = time.getSeconds()
  
  
  // Utilizando a função "scale" para converter uma faixa de números para outra, obtendo um valor equivalente (o 1º parâmetro está relacionado ao 2º e 3º)
  // "hourEl", seu estilo, propriedade transform e altera rotate baseado no valor em "hoursForClock" (converte o valor entre 0 e 11 para algum entre 0 e 360)
  hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(hoursForClock, 0, 11, 0, 360)}deg)`
  
  // "muniteEl", seu estilo, propriedade transform e altera rotate baseado no valor em "minutes" (converte o valor entre 0 e 59 para algum entre 0 e 360)
  minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(minutes, 0, 59, 0, 360)}deg)`
  
  // "secondEl", seu estilo, propriedade transform e altera rotate baseado no valor em "seconds" (converte o valor entre 0 e 11 para algum entre 0 e 360)
  secondEl.style.transform = `translate(-50%, -100%) rotate(${scale(seconds, 0, 59, 0, 360)}deg)`
  
  
  // Insere "hoursForClock" nas horas, nos minutos ele verifica se é maior ou menor que 10 e insere "ampm"
  // Se for MAIOR que 10, ele insere apenas "minutes"
  // Se for MENOR que 10, ele insere "minutes" com um "0" na frente
  timeEl.innerHTML = `${hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`
  dateEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}<span>`
}

const scale = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

// Chama a função assim que a página é carregada
setTime()
// Chama a função com um intervalo de 1s
setInterval(setTime, 1000)

// Função "scale"
// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers