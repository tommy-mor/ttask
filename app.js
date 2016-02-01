
apiURL = 'http://127.0.0.1:5000/get';
function nl2br(str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>';
    return (str + '')
        .replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}
var Vue = require('vue');
Vue.use(require('vue-resource'));
vm = new Vue({
    el: '#tasks',

    data: {
        heading: 'hahaxD',
        newTodo: '',
        todobody: '',
        incoming: '',
        editindex: -1,
        todos: []
    },

    ready: function() {
        console.log('jsadf');
        this.getdata();
    },


    computed: {
        completions: function() {
            return this.todos.filter(function(task) {
                return task.done;
            });
        }
    },
    methods: {
        addTask: function(e) {
            e.preventDefault();
            if(this.newTodo) {
                task = {title:this.newTodo, body: this.todobody, done:false};
                this.todos.unshift(task);
                this.newTodo = '';
                this.todobody = '';
                this.$http.put('http://127.0.0.1:5000/put', task).then(function(response) {
            }, function(response) {
            });
            }
        },
        switchtask: function(index) {
            var test = this.todos[index];
            test.done = !test.done;
            this.todos[index] = test;
            this.$http.put('http://127.0.0.1:5000/switch', index).then(function(response) {});
        },
        completeall: function() {
            this.todos.map(function(task) {
                return task.done = true;
           });
            this.$http.put('http://127.0.0.1:5000/clrall', 3);
        },
        clearcompleted: function() {
            this.todos = this.todos.filter(function(task) {
                return !task.done;
            });
            this.$http.put('http://127.0.0.1:5000/clr',3);
        },
        removeTask: function(id) {
            this.todos.splice(id, 1);
            this.$http.put('http://127.0.0.1:5000/del',id);
        },
        getdata: function() {
            console.log('starting getdata');
            this.$http.get('http://127.0.0.1:5000/get', function(number) {
                    console.log(number);
                    this.$set('todos', number);
                    return number;
            });
        },
        edittask: function(id) {
            //save current editing window
            this.editindex = id;
        },
    },
});
vm.use(require('vue-resource'));
