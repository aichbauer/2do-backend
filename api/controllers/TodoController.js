/**
 * TodoController
 *
 * @description :: Server-side logic for managing todoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  createTodo: function (req, res) {

    var body = req.body;

    Todo.create({
      task: body.task,
      isDone: false
    }).then(function (todo) {
      console.log(todo);
      return res.json(200, {todo:todo});
    }).fail(function (err) {
      console.log(err);
      return res.negotiate(err);
    });
  },
  getTodos: function (req, res) {
    Todo.find().then(function (todos) {
      return res.json(200, {todos: todos});
    }).fail(function (err) {
      console.log(err);
      return res.negotiate(err);
    });
  },
  updateTodo: function (req, res) {

    var id = req.param('todoid');

    Todo.update({id: id}, req.body)
      .then(function (updatedTodo) {
        if (!updatedTodo[0]) return res.json(404, {err: 'todo not found!'});
        return res.json(200, {todo: updatedTodo[0]});
      })
      .fail(function (err) {
        return res.negotiate(err);
      })
  },

  deleteTodo: function(req, res){
    var id = req.param('id');

    Todo.destroy({
        id: id
      })
      .then(function(){
        return res.ok();
      })
      .fail(function(err){
        return res.negotiate(err);
      })

  }
};

