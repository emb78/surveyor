Surveyor::Application.routes.draw do

  resources :surveys, only: [:index, :show]

end
