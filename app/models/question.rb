class Question < ActiveRecord::Base
  belongs_to :survey
  has_many :choices
  accepts_nested_attributes_for :choices, :allow_destroy => true
  default_scope { order(:order) }

  def api_object
    {
        id: self.id,
        text: self.text,
        order: self.order,
    }
  end

end
