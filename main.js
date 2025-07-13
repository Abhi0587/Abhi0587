// main.js

// DOM Elements
const inp_as = document.getElementById('a_size');
const inp_gen = document.getElementById('a_generate');
const inp_aspeed = document.getElementById('a_speed');
const butts_algos = document.querySelectorAll(".algos button");
const cont = document.getElementById("array_container");
const algoLogicDiv = document.getElementById("Algo_logic");
const algoCodeDiv = document.getElementById("Algo_code");

// Globals
let array_size = inp_as.value;
let div_sizes = [];
let divs = [];
let margin_size;
let speed = 1000;
let delay_time = 10000 / (Math.floor(array_size / 10) * speed);
let c_delay = 0;

cont.style = "flex-direction:row";

// Events
inp_gen.addEventListener("click", generate_array);
inp_as.addEventListener("input", update_array_size);
inp_aspeed.addEventListener("input", vis_speed);

// Initialize
window.onload = update_array_size;

function generate_array() {
    cont.innerHTML = "";
    for (let i = 0; i < array_size; i++) {
        div_sizes[i] = Math.floor(Math.random() * 0.5 * (inp_as.max - inp_as.min)) + 10;
        divs[i] = document.createElement("div");
        cont.appendChild(divs[i]);
        margin_size = 0.1;
        divs[i].style = `margin:0% ${margin_size}%; background-color:blue; width:${100 / array_size - (2 * margin_size)}%; height:${div_sizes[i]}%;`;
    }
    algoLogicDiv.innerHTML = "";
    algoCodeDiv.innerHTML = "";
}

function update_array_size() {
    array_size = inp_as.value;
    generate_array();
}

function vis_speed() {
    const array_speed = inp_aspeed.value;
    switch (parseInt(array_speed)) {
        case 1: speed = 1; break;
        case 2: speed = 3; break;
        case 3: speed = 20; break;
        case 4: speed = 30; break;
        case 5: speed = 100; break;
    }
    delay_time = 10000 / (Math.floor(array_size / 10) * speed);
}

function div_update(cont, height, color) {
    window.setTimeout(() => {
        cont.style = `margin:0% ${margin_size}%; width:${100 / array_size - (2 * margin_size)}%; height:${height}%; background-color:${color};`;
    }, c_delay += delay_time);
}

function enable_buttons() {
    window.setTimeout(() => {
        for (let i = 0; i < butts_algos.length; i++) {
            butts_algos[i].classList = [];
            butts_algos[i].classList.add("butt_unselected");
            butts_algos[i].disabled = false;
        }
        inp_as.disabled = false;
        inp_gen.disabled = false;
        inp_aspeed.disabled = false;
    }, c_delay += delay_time);
}

function disable_buttons() {
    for (let i = 0; i < butts_algos.length; i++) {
        butts_algos[i].classList = [];
        butts_algos[i].classList.add("butt_locked");
        butts_algos[i].disabled = true;
    }
    inp_as.disabled = true;
    inp_gen.disabled = true;
    inp_aspeed.disabled = true;
}

function runalgo() {
    disable_buttons();
    this.classList.add("butt_selected");

    // Set logic and pseudocode based on selected algorithm
    let logic = "";
    let pseudocode = "";

    switch (this.innerHTML) {
        case "Bubble":
            Bubble();
            logic = "Compare adjacent elements and swap if out of order, repeatedly passing through the array.";
            pseudocode = `
function bubbleSort(arr):
    for i from 0 to arr.length-1:
        for j from 0 to arr.length-i-1:
            if arr[j] > arr[j+1]:
                swap(arr[j], arr[j+1])`;
            break;
        case "Selection":
            Selection_sort();
            logic = "Find the minimum element in the unsorted part and place it at the beginning.";
            pseudocode = `
function selectionSort(arr):
    for i from 0 to arr.length-1:
        minIndex = i
        for j from i+1 to arr.length:
            if arr[j] < arr[minIndex]:
                minIndex = j
        swap(arr[i], arr[minIndex])`;
            break;
        case "Insertion":
            Insertion();
            logic = "Build the sorted array one element at a time by comparing with sorted part and shifting.";
            pseudocode = `
function insertionSort(arr):
    for i from 1 to arr.length:
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j+1] = arr[j]
            j -= 1
        arr[j+1] = key`;
            break;
        case "Merge":
            Merge();
            logic = "Divide array into halves, sort them recursively, and merge the sorted halves.";
            pseudocode = `
function mergeSort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        L = arr[:mid]
        R = arr[mid:]
        mergeSort(L)
        mergeSort(R)
        merge L and R`;
            break;
        case "Quick":
            Quick();
            logic = "Pick a pivot, partition the array around pivot, then recursively sort subarrays.";
            pseudocode = `
function quickSort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quickSort(arr, low, pi - 1)
        quickSort(arr, pi + 1, high)`;
            break;
        case "Heap":
            Heap();
            logic = "Build a max heap and repeatedly extract maximum element to sort.";
            pseudocode = `
function heapSort(arr):
    buildMaxHeap(arr)
    for i from arr.length-1 to 1:
        swap(arr[0], arr[i])
        heapify(arr, 0, i)`;
            break;
    }

    algoLogicDiv.innerText = logic;
    algoCodeDiv.innerHTML = `<pre>${pseudocode}</pre>`;
}

// Attach click listeners to algorithm buttons
butts_algos.forEach(button => {
    button.addEventListener("click", runalgo);
});
