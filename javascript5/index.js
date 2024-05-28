var botao = document.getElementById("botao")

const input1 = document.getElementById("barra1")
const input2 = document.getElementById("barra2")
const input3 = document.getElementById("barra3")
const input4 = document.getElementById("barra4")
const input5 = document.getElementById("barra5")

const div1 = document.getElementById("div1")
const div2 = document.getElementById("div2")
const div3 = document.getElementById("div3")
const div4 = document.getElementById("div4")
const div5 = document.getElementById("div5")

botao.onclick = (event) => {
    event.preventDefault()

    console.log(input1.value)
    console.log(input2.value)
    console.log(input3.value)
    console.log(input4.value)
    console.log(input5.value)

    div1.style.setProperty("height",input1.value)
    div2.style.setProperty("height",input2.value)
    div3.style.setProperty("height",input3.value)
    div4.style.setProperty("height",input4.value)
    div5.style.setProperty("height",input5.value)
}