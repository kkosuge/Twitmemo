require 'spec_helper'

describe "memos/index" do
  before(:each) do
    assign(:memos, [
      stub_model(Memo,
        :name => "Name",
        :note => "MyText",
        :flag => 1
      ),
      stub_model(Memo,
        :name => "Name",
        :note => "MyText",
        :flag => 1
      )
    ])
  end

  it "renders a list of memos" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => 1.to_s, :count => 2
  end
end
