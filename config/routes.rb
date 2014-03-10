Surveyor::Application.routes.draw do

  resources :surveys, only: [:index, :show] do
    get 'results'
  end
  resources :users_answers, only: [:create]

end
