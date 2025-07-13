function Heap() {
    document.getElementById("Time_Worst").innerText = "O(N log N)";
    document.getElementById("Time_Average").innerText = "Θ(N log N)";
    document.getElementById("Time_Best").innerText = "Ω(N log N)";
    document.getElementById("Space_Worst").innerText = "O(1)";
    document.getElementById('Algo_logic').innerHTML = `Heap Sort Logic Displayed`;

    c_delay = 0;

    for (var i = Math.floor(array_size / 2) - 1; i >= 0; i--) {
        max_heapify(array_size, i);
    }

    for (var i = array_size - 1; i > 0; i--) {
        swap(0, i);
        div_update(divs[i], div_sizes[i], "green");
        max_heapify(i, 0);
    }

    div_update(divs[0], div_sizes[0], "green");

    enable_buttons();
}

function max_heapify(n, i) {
    var largest = i;
    var l = 2 * i + 1;
    var r = 2 * i + 2;

    if (l < n && div_sizes[l] > div_sizes[largest]) largest = l;
    if (r < n && div_sizes[r] > div_sizes[largest]) largest = r;

    if (largest != i) {
        swap(i, largest);
        max_heapify(n, largest);
    }
}

function swap(i, j) {
    div_update(divs[i], div_sizes[i], "red");
    div_update(divs[j], div_sizes[j], "red");

    var temp = div_sizes[i];
    div_sizes[i] = div_sizes[j];
    div_sizes[j] = temp;

    div_update(divs[i], div_sizes[i], "blue");
    div_update(divs[j], div_sizes[j], "blue");
}
