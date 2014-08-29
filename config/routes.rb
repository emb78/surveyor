Surveyor::Application.routes.draw do

  root to: 'surveys#index'

  resources :surveys, only: [:new, :index, :show] do
    get 'results'
  end
  resources :users_answers, only: [:create]

end
