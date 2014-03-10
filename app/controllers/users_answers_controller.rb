class UsersAnswersController < ApplicationController
  def create
    choice = Choice.find params[:choice_id]
    if UsersAnswer.create(choice_id: choice.id, question_id: choice.question.id)
      render json: {success: true}
    else
      render json: {success: false}
    end
  end
end
