class Choice < ActiveRecord::Base
  belongs_to :question

  default_scope order(:order)
end
