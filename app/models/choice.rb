class Choice < ActiveRecord::Base
  belongs_to :question

  default_scope { order(:order) }

  def api_object
    {
        id: self.id,
        text: self.text,
        order: self.order,
    }
  end
end
