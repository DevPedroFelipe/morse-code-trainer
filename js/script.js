const morseCodeAlphabet = [
  ['A', '.-'], ['B', '-...'], ['C', '-.-.'],
  ['D', '-..'], ['E', '.'], ['F', '..-.'],
  ['G', '--.'], ['H', '....'], ['I', '..'],
  ['J', '.---'], ['K', '-.-'], ['L', '.-..'],
  ['M', '--'], ['N', '-.'], ['O', '---'],
  ['P', '.--.'], ['Q', '--.-'], ['R', '.-.'],
  ['S', '...'], ['T', '-'], ['U', '..-'],
  ['V', '...-'], ['W', '.--'], ['X', '-..-'],
  ['Y', '-.--'], ['Z', '--..'], ['1', '.----'],
  ['2', '..---'], ['3', '...--'], ['4', '....-'],
  ['5', '.....'], ['6', '-....'], ['7', '--...'],
  ['8', '---..'], ['9', '----.'], ['0', '-----'],
];

const language = {

  "pt-br": {
    txaInput: "Seu código morse...",
    txaOutput: "Seu texto...",
    h2Instruction: "INSTRUÇÕES",
    p1Instruction: "O Código Morse é um sistema de representação de letras, algarismos e sinais de pontuação através de um sinal codificado enviado de modo intermitente.",
    p2Instruction: "Para utilizar o telégráfo clique sobre seu botão ou pressione a tecla de espaço.",
    p3Instruction: "Clicar ou pressionar rapidamente gerará um ponto (•)",
    p4Instruction: "Clicar ou pressionar e manter por um curto período de tempo gerará um traço (—)",
    p5Instruction: "Um espaço separa as letras, dois espaços separam as palavras.",
    btnPlayTextToMorse: "Reproduzir Texto Para Morse",
    btnStopTextToMorse: "Parar Texto Para Morse",
    btnClearText: "Limpar Texto",
    btnMorseTextToText: "Reproduzir Morse Para Texto",
    btnClearMorse: "Limpar Morse"
  },

  "en-us": {
    txaInput: "Your morse code...",
    txaOutput: "Your text...",
    h2Instruction: "INSTRUCTIONS",
    p1Instruction: "Morse code is a system for representing letters, numbers and punctuation through a coded signal sent intermittently.",
    p2Instruction: "To use the telegraph click on its knob or press the space key.",
    p3Instruction: "Quick clicking or pressing will generate a point (•)",
    p4Instruction: "Clicking or pressing and holding for a short time will generate a dash (—)",
    p5Instruction: "One space separates letters, two spaces separates words.",
    btnPlayTextToMorse: "Play Text To Morse",
    btnStopTextToMorse: "Stop Text To Morse",
    btnClearText: "Clear Text",
    btnMorseTextToText: "Play Morse To Text",
    btnClearMorse: "Clear Morse"
  }

};

const beep = new Audio("sound/beep.mp3");
const click = new Audio("sound/click.mp3");

var imgTelegraph = document.getElementById('imgTelegraph');
var keyTime = 0;
var standByTimeout = 0;
var spaceTimeout = 0;
var writeMorseStatus = true;
var soundStatus = true;

// Método responsável por iniciar o sistema.
function init() {

  startEventListeners();
  changeLanguage('en-us');
}

// Método responsável por iniciar os ouvintes de eventos.
function startEventListeners() {

  let divTxa = document.getElementsByClassName('divTxa');

  for (let i = 0; i <= divTxa.length - 1; i++) {
    divTxa[i].children[0].addEventListener('focus', () => {
      document.removeEventListener('keydown', keyDown);
      document.removeEventListener('keyup', keyUp);
    });

    divTxa[i].children[0].addEventListener('blur', () => {
      document.addEventListener('keydown', keyDown);
      document.addEventListener('keyup', keyUp);
    });
  }

  document.addEventListener('keydown', keyDown);
  document.addEventListener('keyup', keyUp);
}

// Método responsável por alterar a linguagem.
function changeLanguage(lang) {

  // Pegando os elementos que terão textos traduzidos.
  let txaInput = document.getElementById("txaInput");
  let txaOutput = document.getElementById("txaOutput");
  let h2Instruction = document.getElementById("h2Instruction");
  let p1Instruction = document.getElementById("p1Instruction");
  let p2Instruction = document.getElementById("p2Instruction");
  let p3Instruction = document.getElementById("p3Instruction");
  let p4Instruction = document.getElementById("p4Instruction");
  let p5Instruction = document.getElementById("p5Instruction");
  let btnPlayTextToMorse = document.getElementById("btnPlayTextToMorse");
  let btnStopTextToMorse = document.getElementById("btnStopTextToMorse");
  let btnClearText = document.getElementById("btnClearText");
  let btnMorseTextToText = document.getElementById("btnPlayMorseToText");
  let btnClearMorse = document.getElementById("btnClearMorse");

  // Definindo tradução dos textos dos elementos baseado na linguagem escolhida.
  switch (lang) {
    case "pt-br":
      txaInput.placeholder = language["pt-br"].txaInput;
      txaOutput.placeholder = language["pt-br"].txaOutput;
      h2Instruction.innerHTML = language["pt-br"].h2Instruction;
      p1Instruction.innerHTML = language["pt-br"].p1Instruction;
      p2Instruction.innerHTML = language["pt-br"].p2Instruction;
      p3Instruction.innerHTML = language["pt-br"].p3Instruction;
      p4Instruction.innerHTML = language["pt-br"].p4Instruction;
      p5Instruction.innerHTML = language["pt-br"].p5Instruction;
      btnPlayTextToMorse.setAttribute("data-tooltip", language["pt-br"].btnPlayTextToMorse);
      btnStopTextToMorse.setAttribute("data-tooltip", language["pt-br"].btnStopTextToMorse);
      btnClearText.setAttribute("data-tooltip", language["pt-br"].btnClearText);
      btnMorseTextToText.setAttribute("data-tooltip", language["pt-br"].btnMorseTextToText);
      btnClearMorse.setAttribute("data-tooltip", language["pt-br"].btnClearMorse);
      break

    case "en-us":
      txaInput.placeholder = language["en-us"].txaInput;
      txaOutput.placeholder = language["en-us"].txaOutput;
      h2Instruction.innerHTML = language["en-us"].h2Instruction;
      p1Instruction.innerHTML = language["en-us"].p1Instruction;
      p2Instruction.innerHTML = language["en-us"].p2Instruction;
      p3Instruction.innerHTML = language["en-us"].p3Instruction;
      p4Instruction.innerHTML = language["en-us"].p4Instruction;
      p5Instruction.innerHTML = language["en-us"].p5Instruction;
      btnPlayTextToMorse.setAttribute("data-tooltip", language["en-us"].btnPlayTextToMorse);
      btnStopTextToMorse.setAttribute("data-tooltip", language["en-us"].btnStopTextToMorse);
      btnClearText.setAttribute("data-tooltip", language["en-us"].btnClearText);
      btnMorseTextToText.setAttribute("data-tooltip", language["en-us"].btnMorseTextToText);
      btnClearMorse.setAttribute("data-tooltip", language["en-us"].btnClearMorse);
      break
  }
}

// Método responsável pelo controle do som do telégrafo.
function soundControl() {

  let imgSound = document.getElementById("imgSound");

  if (!soundStatus) {
    imgSound.src = "img/imgSoundOn.svg";
    soundStatus = true;
  } else {
    imgSound.src = "img/imgSoundOff.svg";
    soundStatus = false;
  }

}

// Método responsável por ativar/desativar os botões de opção.
function buttonControl(value, color) {

  let buttons = document.getElementsByClassName('options');

  for (let i = 0; i < buttons.length; i++) {

    if (buttons[i].id != 'btnStopTextToMorse') {
      buttons[i].disabled = value;
      buttons[i].style.backgroundColor = color;
    }

  }

}

// Método responsável por alimentar o textarea de entrada com código morse.
function input(code) {

  let textAreaInput = document.getElementById('txaInput');

  textAreaInput.value += code;

  textAreaInput.scrollTop = textAreaInput.scrollHeight;
}

// Método responsável por alimentar o textarea de saída com texto.
function output(textArray) {

  let textAreaOutput = document.getElementById('txaOutput');

  textAreaOutput.value = "";

  textArray.forEach(text => {

    textAreaOutput.value += text;

  });

  textAreaOutput.scrollTop = textAreaOutput.scrollHeight;

}

// Método responsável por traduzir de morse pra texto e vice-versa.
function translator(array, returnType) {

  let translation = new Array();

  array.forEach(value => {

    // Comparando valores do array com o alfabeto morse e alimentando array de retorno.
    morseCodeAlphabet.forEach(alphabet => {

      if (returnType === "text") {

        if (value.toUpperCase() == alphabet[1]) {
          translation.push(alphabet[0]);
        }

      } else if (returnType === "morse") {
        if (value.toUpperCase() == alphabet[0]) {
          translation.push(`${alphabet[1]} `);
        }
      }

    });

    // Adicionando espaço ao array.
    if (value == "" || value == " ") {
      translation.push(" ");
    }

  });

  return translation;
}

// Método responsável por limpar o contéudo das areas de texto.
function clearTextArea(texAreaId) {
  document.getElementById(texAreaId).value = "";
}

// Método responsável por reproduzir texto para morse.
function playTextToMorse() {

  let txaOutput = document.getElementById('txaOutput');

  if (txaOutput.value != "") {

    buttonControl(true, 'lightgray');

    let morseArray = translator(txaOutput.value.split(''), "morse");

    let morseSplitArray = new Array();

    // Alimentando array com código morse dividido em (.) e (-)
    for (let i = 0; i <= morseArray.length - 1; i++) {

      let splitValue = morseArray[i].split('');

      for (let x = 0; x <= splitValue.length - 1; x++) {
        morseSplitArray.push(splitValue[x]);
      }
    }

    document.getElementById('txaInput').value = "";

    writeMorseStatus = true;

    writeMorse(morseSplitArray);
  }

}

// Método reponsável por escrever na textarea de input e executar o som do código morse.
function writeMorse(morseSplitArray, i = 0) {

  if (i != morseSplitArray.length && writeMorseStatus) {

    // Definindo novo áudio de beep e click.
    const beep = new Audio("sound/beep.mp3");
    const click = new Audio("sound/click.mp3");

    // Definindo o tempo de reprodução do beep baseado em Dits(pontos) e Dahs(traços).
    t = morseSplitArray[i] == "." ? 200 : 400;

    // Checando se será executado com som e se o value do array é diferente de espaço em branco.
    if (morseSplitArray[i] != " " && soundStatus) {
      beep.play();
      click.play();

      imgTelegraph.src = "img/imgTelegraphDown.png";
    }

    input(morseSplitArray[i]);

    setTimeout(() => {

      // Checando se o value do array é diferente de espaço em branco.
      if (morseSplitArray[i] != " ") {
        // Pausando o som de beep.
        beep.pause();

        // Definindo imagem do telégrafo para up.
        imgTelegraph.src = "img/imgTelegraphUp.png";
      }

      // Timeout responsável por continuar executando função de escrever morse e reproduzir beep enquanto houver elemento no array.
      setTimeout(() => {
        writeMorse(morseSplitArray, i + 1);
      }, 100);


    }, t);

  } else {
    buttonControl(false, '#2a2829');
  }
}

// Método responsável por parar a execução da reprodução e tradução de texto para morse.
function stopTextToMorse() {
  document.getElementById('txaInput').value = "";
  writeMorseStatus = false;
  buttonControl(false, '#2a2829');
}

// Método responsável por reproduzir morse para texto.
function playMorseToText() {

  let txaInput = document.getElementById('txaInput');

  if (txaInput.value != "") {
    output(translator(txaInput.value.split(' '), "text"));
  }

}

function controlButtons() {

}

// Método responsável por executar ações no evento keyDown do EventListener.
function keyDown(e) {

  if (e.keyCode === 32 && !keyTime || e.type == "mousedown") {

    // Checando se a será executado com som.
    if (soundStatus) {
      // Executando o som de beep e click.
      click.play();
      beep.play();
    }

    // Definindo imagem do telégrafo para Down.
    imgTelegraph.src = "img/imgTelegraphDown.png";

    // Limpando os Timeouts definidos no método keyUp.
    clearTimeout(standByTimeout);
    clearTimeout(spaceTimeout);

    keyTime = new Date().getTime();

  }

}

// Método responsável por executar ações no evento keyUp do EventListener.
function keyUp(e) {

  if (e.keyCode === 32 && keyTime || e.type == "mouseup") {

    // Pausando e recarregando o som de beep e definindo imagem do telégrafo para up.
    beep.pause();
    beep.load();
    imgTelegraph.src = "img/imgTelegraphUp.png";

    let holdingTime = new Date().getTime() - keyTime;

    // Comparando tempo de pressionamento da tecla de espaço e definindo os Dits e os Dahs.
    if (holdingTime > 200 && holdingTime <= 500) {
      input('-');
    } else if (holdingTime <= 300) {
      input('.');
    }

    // Resetando tempo de pressionamento da tecla de espaço.
    keyTime = 0;

    // Timeout responsável por espaço entre letras no textarea de input e tradução do morse pro textarea de output.
    standByTimeout = setTimeout(() => {
      input(' ');
      output(translator(document.getElementById('txaInput').value.split(' '), "text"));
    }, 400);

    // Timeout responsável por espaço entre palavras no textarea de input.
    spaceTimeout = setTimeout(() => {
      document.getElementById('txaInput').value += ' ';
    }, 1000);

  }

}