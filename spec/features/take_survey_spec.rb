require "spec_helper"

feature "take survey" do
  it "user can take the survey and view the results", js: true do
    visit surveys_path
    click_link "Preferences"

    page.find('.survey-page').should have_text("What's your favorite color?")
    page.find(".next-button")[:class].include?("inactive")

    page.find('.choice[data-choice-id="1"]').click
    page.find('.next-button').click

    page.find('.survey-page').should have_text("The best way I learn something new is")
    page.find('.choice[data-choice-id="4"]').click
    page.find('.next-button').click

    page.find('.content').should have_text("The results are in")

  end
end