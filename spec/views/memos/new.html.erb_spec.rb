require 'spec_helper'

describe "memos/new" do
  before(:each) do
    assign(:memo, stub_model(Memo,
      :name => "MyString",
      :note => "MyText",
      :flag => 1
    ).as_new_record)
  end

  it "renders new memo form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => memos_path, :method => "post" do
      assert_select "input#memo_name", :name => "memo[name]"
      assert_select "textarea#memo_note", :name => "memo[note]"
      assert_select "input#memo_flag", :name => "memo[flag]"
    end
  end
end
