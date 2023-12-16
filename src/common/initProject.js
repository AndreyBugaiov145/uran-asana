import {tasks} from '../data/initData.js'

export function init() {
    if (localStorage.getItem("uran-asana-init") !== 'true') {
        localStorage.setItem("uran-asana-init", 'true');
        localStorage.setItem("uran-asana-tasks", JSON.stringify(tasks));
    }
}