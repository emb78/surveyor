class Question < ActiveRecord::Base
  belongs_to :survey
  has_many :choices
  default_scope { order(:order) }

  def api_object
    {
        id: self.id,
        text: self.text,
        order: self.order,
    }
  end

end
