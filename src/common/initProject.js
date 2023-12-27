import {tasks} from '../data/initData.js'

export function init() {
    if (localStorage.getItem("uran-asana-init") !== 'true') {
        localStorage.setItem("uran-asana-init", 'true');
        try {
            const taskData =  JSON.stringify(tasks)
            localStorage.setItem("uran-asana-tasks", taskData);
        } catch (error) {
            localStorage.setItem("uran-asana-tasks", []);
        }
    }
}