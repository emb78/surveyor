class CreateSurveys < ActiveRecord::Migration
  def change
    create_table :surveys do |t|
      t.string :title
      t.timestamps
    end

    create_table :questions do |t|
      t.integer :survey_id
      t.integer :order
      t.string :text
      t.timestamps
    end

    create_table :choices do |t|
      t.integer :order
      t.string :text
      t.integer :question_id
      t.timestamps
    end

    create_table :users_answers do |t|
      t.integer :choice_id
      t.integer :question_id
      t.timestamps
    end
  end
end
