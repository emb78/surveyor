require "spec_helper"

feature "take survey" do
  it "user can take the survey and view the results", js: true do
    visit surveys_path
    click_link "Preferences"
    page.should have_content "What's your favorite color?"

  end
end