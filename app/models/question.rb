class Question < ActiveRecord::Base
  belongs_to :survey
  has_many :choices
  default_scope order(:order)

end
