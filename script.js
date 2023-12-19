"use strict"

new Vue({
    el: '#app',
    data: {
        tasks: [],         // Liste des tâches
        newTask: '',       // Nouvelle tâche à ajouter
        editIndex: -1,      // Index de la tâche en cours d'édition (-1 signifie aucune édition)
        isEditing: false,
        storage_key: 'vue-js-3-task',
        checked: false,
    },
    methods: {
        addTask: function () {
            if (this.newTask.trim() !== '') {
                // Ajouter la nouvelle tâche à la liste
                this.tasks.push(this.newTask);
                // Réinitialiser le champ de saisie
                this.newTask = '';
                // Sauvegarder la tâche dans le localStorage
                this.saveTask();
            }
        },
        removeTask: function (index) {
            // Supprimer la tâche à l'index spécifié
            this.tasks.splice(index, 1);
            // Réinitialiser l'index d'édition
            this.editIndex = -1;
            // Sauvegarder les modifications dans le localStorage
            this.saveTask();
        },
        toggleEdit: function (index) {
            // Cette méthode permet de basculer entre l'édition et la visualisation en utilisant le bouton "Modifier".
            
            if (this.editIndex === index) {
                this.saveEdit();
            } else {
                this.editTask(index);
            }
        },

        editTask: function (index) {
            // Activer le mode d'édition pour la tâche à l'index spécifié
            this.editIndex = index;
            // Mettre le texte de la tâche en cours d'édition dans le champ de saisie
            this.newTask = this.tasks[index];
            this.isEditing = true;
        },
        saveEdit: function (index) {
            // Sauvegarder la modification de la tâche en cours d'édition
            if (this.newTask !== '') {
                this.tasks[this.index] = this.newTask;
                // Réinitialiser le champ de saisie
                this.newTask = '';
                // Réinitialiser l'index d'édition
                this.editIndex = -1;
                // Désactiver le mode d'édition
                this.isEditing = false;
                // Sauvegarder les modifications dans le localStorage
                this.saveTask();
            }
        },
        cancelEdit: function () {
            // Annuler le mode d'édition
            // Réinitialiser le champ de saisie
            this.newTask = '';
            // Réinitialiser l'index d'édition
            this.editIndex = -1;
            // Désactiver le mode d'édition
            this.isEditing = false;
        },
        saveTask: function () {
            // Convertir les données en JSON et les stocker dans le LocalStorage
            localStorage.setItem(this.storage_key, JSON.stringify(this.tasks));
        },
        loadTask: function () {
            // Charger les données depuis le localStorage lors de l'initialisation
            const storedTasks = localStorage.getItem(this.storage_key);
            if (storedTasks) {
                this.tasks = JSON.parse(storedTasks);
            }
        },
    },
    mounted() {
        // Charger les données depuis le localStorage lors de l'initialisation
        this.loadTask();
    },
});


