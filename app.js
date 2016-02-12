var Vue = require('vue');
var mycomp = Vue.extend({
    template: '#list',
    props: {
        type: {
            type: String,
        },
        edit: {
            type: Number,
        },
        index: {
            type: Number,
        },
        data: {
            default: function() {
                return { body: '', title: '', type: 'text', edit: 0 };
            }
        }
    },
    methods: {
        edittask: function(index) {
            this.edit = 1;
        },
        addtask: function() {
            this.$dispatch('add-t', this.data);
            this.data =  { body: '', title: '', type: 'text', edit: 1 };
        },
        finishedit: function(id) {
            this.edit = false;
            this.$http.put('http://127.0.0.1:5000/edit/' + this.index, {title:this.newTodo, body: this.todobody, type:'text'}).then(function() {
                    console.log('sucees of mems hsh');
                    console.log(this.index);
                }
            );
        },
        removeTask: function(id) {
            console.log('memes' + id);
            this.$dispatcdatah('deleteT', id);
        }
    }
});
Vue.use(require('vue-resource'));
vm = new Vue({
    el: '#tasks',
    components: {
        'my-comp': mycomp
    },
    data: {
        heading: 'hahaxD',
        newTodo: '',
        todobody: '',
        incoming: '',
        edittitle: '',
        editbody: '',
        editindex: -1,
        todos: []
    },

    ready: function() {
        console.log('jsadf');
        this.getdata();
    },
    events: {'add-t': function(data) {
        console.log(data + ' wamts tp be added');
        this.todos.unshift(data);
        this.$http.put('http://127.0.0.1:5000/put', data);
    }},

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
                task = {title:this.newTodo, body: this.todobody, done:false, type:'text'};
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
            console.log('---1-1-1-1-',id);
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
            var temp = this.todos[id];
            this.editbody = temp.body;
            this.edittitle = temp.title;
        },
        finishedit: function(id) {
            this.$http.put('http://127.0.0.1:5000/del', id);
            var task = {title: this.edittitle, body: this.editbody, done: this.todos[id].done}
            this.$http.put('http://127.0.0.1:5000/put', task);
            this.editbody = '';
            this.todos.splice(id, 1);
            this.todos.unshift(task);
            this.edittitle = '';
            this.editindex = -1;
        }
    },
});
vm.use(require('vue-resource'));
