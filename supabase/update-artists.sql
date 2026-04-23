-- Set all artists except Maccs Customs to paused
UPDATE artists SET status = 'paused' WHERE slug != 'maccs-customs';

-- Update Maccs Customs with new details
UPDATE artists SET
  tagline = 'Hand-painted shirts. One of one.',
  bio = 'Custom hand-painted button-ups and denim. Every piece is a one-off — screen printed and painted by hand in Fitzroy. Reptile motifs, bold colour, shirts you''ll actually want to wear out.',
  price_range = '$180',
  listings_count = 2
WHERE slug = 'maccs-customs';

-- Insert two listings for Maccs Customs
INSERT INTO listings (artist_id, title, description, price, price_type, material, dimensions, lead_time, status, image_urls, tags, sort_order)
SELECT
  a.id,
  'Serpent Oxford',
  'Hand-printed navy serpent on a light blue oxford button-up. Coiling snake design with scaled detail running down the front panel. One of one.',
  180,
  'fixed',
  '100% cotton oxford, screen printed',
  'One size — made to measure',
  '1–2 weeks',
  'live',
  ARRAY['/images/maccs-customs/snake-shirt.jpg'],
  ARRAY['shirt', 'snake', 'hand-painted', 'oxford'],
  1
FROM artists a WHERE a.slug = 'maccs-customs';

INSERT INTO listings (artist_id, title, description, price, price_type, material, dimensions, lead_time, status, image_urls, tags, sort_order)
SELECT
  a.id,
  'Croc Pinstripe',
  'Red crocodile illustration screen printed on a blue pinstripe button-up. Three-panel reptile motif with yellow eye detail. One of one.',
  180,
  'fixed',
  'Cotton pinstripe, screen printed',
  'One size — made to measure',
  '1–2 weeks',
  'live',
  ARRAY['/images/maccs-customs/croc-shirt.jpg'],
  ARRAY['shirt', 'crocodile', 'hand-painted', 'pinstripe'],
  2
FROM artists a WHERE a.slug = 'maccs-customs';
