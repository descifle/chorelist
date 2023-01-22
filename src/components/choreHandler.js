export default class ChoreHandler {

    createChore(user, chore, day, notes) {
        localStorage.setItem("chores", JSON.stringify([...this.getChores(), { user, chore, day, notes }]));
        return this.getChores();
    }

    getChores() {
        return JSON.parse(localStorage.getItem("chores")) ?? [];
    }

    updateChore(user, chore, day) {
        let currentChores = this.getChores();

        console.log(currentChores)
    }

    deleteChore(id) {
        // Update this to delete chores by id rather than array index
        const chores = this.getChores().filter((chore, i) => i !== id);
        localStorage.setItem("chores", JSON.stringify([...chores]));
    }
}